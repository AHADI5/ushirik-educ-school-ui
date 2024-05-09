import ClassroomTable from "./class_room_table";
import TabsComponent from "./class_rooms_tabs";
import { useState ,useEffect } from "react";
import SectionTab from "./section_tab";
import { useParams } from "react-router-dom";
import useSchoolData from "../../../services/school_";

export default function ClassRooms () {
    const param  = useParams()
    const {school} = useSchoolData(param['schoolID'])
    const [isLoading, setIsLoading] = useState(true);
    const [classrooms, setClassrooms] = useState([]);
    console.log(school)
    useEffect(() => {
      // Fetch classrooms data here
      // After data is fetched, set isLoading to false
      setIsLoading(false);
    }, []);

    const tabs = [
        {title:"Salle de classe" , content: isLoading ? 'Loading...' : <ClassroomTable classrooms={classrooms} />},
        {title:"Option Organisées" , content : <SectionTab school={school} />}
        
    ]
    
    return (
      <div className="ml-44 mt-20">
        <TabsComponent tabs={tabs}/>
      </div>
    );
    
}