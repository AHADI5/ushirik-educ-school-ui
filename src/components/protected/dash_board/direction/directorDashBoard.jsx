
import { useParams } from "react-router-dom";
import DirectorContent from "./directorContent";

 

export default function DirectorDashBoard() {

    //use params here 
    const params  = useParams();
    
    return (
        <div className="ml-44 mr-3 mt-20">
            <DirectorContent schoolID ={params['schoolID']}/> 
        </div>
    );
}