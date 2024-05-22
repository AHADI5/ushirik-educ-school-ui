import { Outlet } from "react-router-dom";
import AppMenu from "./app_side_bar";

import { faHomeAlt,
    faUserAlt ,
 
    faNewspaper ,
    faUserGroup,
    faChalkboardTeacher,
    faCalendarWeek
    
  } from "@fortawesome/free-solid-svg-icons";   
import { useParams } from "react-router-dom";
export default function DirectorSideBar() {
    const params  = useParams() 
    const menuComponents = [
        { menu: "Accueil", link: `/schoolDirection/${params['schoolID']}`, icon: faHomeAlt },
        { menu: "Classes", link: `/schoolDirection/${params['schoolID']}/classrooms/`, icon: faUserAlt },
        { menu: "Communiqués", link: `/schoolDirection/${params['schoolID']}/communique-all`, icon: faNewspaper },
        { menu: "Elèves", link: `/schoolDirection/${params['schoolID']}/students`, icon: faUserGroup }, 
        { menu: "Evénéments", link: `/schoolDirection/${params['schoolID']}/events`, icon: faCalendarWeek },
        { menu: "Cours", link: `/schoolDirection/${params['schoolID']}/courses`, icon: faChalkboardTeacher }, 
        { menu: "Enseigants", link: `/schoolDirection/${params['schoolID']}/enseignants`, icon: faChalkboardTeacher },
       
    ];
    return (
        <>
            
             <AppMenu menus={menuComponents}/>
             <Outlet/>
             
        </>
    )
}