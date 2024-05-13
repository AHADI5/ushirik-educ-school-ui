import { faCalendar, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import instance from "../../../services/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "../../common/utilities/time_ago";
import { StyledButton } from "../../common/utilities/styled_button";

export default function RecentCommunique({iscommuniqueEmpty}) {
    const param = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [recentCommuniques, setRecentCommunique] = useState([]);

    // Fetch data
    useEffect(() => {
        const fetchCommunique = async () => {
            setIsLoading(true);
            try {
                const response = await instance.get(`/api/v1/school/${param['schoolID']}/recentCommuniques`);
                setRecentCommunique(response.data);

                //pass the result to the parent component 
                iscommuniqueEmpty(response.data);
            } catch (error) {
                console.error('Error fetching communiques:', error);
            }
            setIsLoading(false);
        };

        fetchCommunique();
    }, [param.schoolID] , iscommuniqueEmpty);

    function createSubstring(text, length = 57) {
        return text.substring(0, length);
      }
      

    return (
        <>
            {isLoading ? (
                <p>Loading...</p> // You can replace this with a spinner or any loading indicator
            ) : (
                recentCommuniques.length === 0 ? 
                    <div className="alternative-model">
                        <p className="flex justify-center mt-10 text-xs text-gray-400"> <span> Pas de communiqué récent</span></p>
                        <div className="flex items-center justify-center pt-2"> <Link to={`/schoolDirection/${param['schoolID']}/new-communique`}><StyledButton text={"nouveau"}/></Link>  </div> 
                    </div>
                   
                    
                    : recentCommuniques.map((communique) => (
                    <div key={communique.id} className="pb-2 mb-2 p-3 bg-gray-100 cursor-pointer">
                        <h3 className="text-xs text-gray-400 font-semibold pt-2 flex justify-between">
                            <p>{communique.title}</p>
                            <p className="flex gap-2 items-center">
                                <FontAwesomeIcon icon={faEye} color="green" />
                                <span>{/*{communique.viewCount}*/} 40/50</span>
                            </p>
                        </h3>
                        <p className="text-gray-600 text-xs pt-2">
                            <FontAwesomeIcon icon={faCalendar} color="blue" />
                            <span> <TimeAgo dateString={communique.publishedDate}/></span>
                        </p>
                        <p className="text-gray-800 text-xs pt-2">{createSubstring(communique.content)}</p>
                    </div>
                ))
            )}
        </>
    );
}
