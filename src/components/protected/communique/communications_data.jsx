import CommuniqueService from "../../../services/communique_service"
import { useState } from "react";
import CommunicationsList from "./communique_list";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function SchoolCommunications () {
    //fetch data 
    const [communques , setCommuniques] = useState([])
    const params = useParams()
    useEffect(() => {
        fetchClassrooms();
      }, [params['schoolID']]);

      const fetchClassrooms = async () => {
          try {
            const response = await CommuniqueService.getCommuniques(params['schoolID']);
            console.log("ClassRooms " , response)
            setCommuniques(response);
          } catch (error) {
            console.error('Error fetching classrooms:', error);
          }
        };
    
    return  (
        <>
        <div className="ml-44 mr-3 mt-20">
            <CommunicationsList communications={communques}/>
        </div>            
        </>
    )
}