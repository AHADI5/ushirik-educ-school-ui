import { useParams } from "react-router-dom";
import AdminDashContent from "./admin_content";
export default function AdminDasBoard() {
    const params = useParams()
    console.log(params);

  
  
    return (
       <div className="ml-44 mr-3 mt-20">
            {/* <AppHeader /> */}
            {/* <AppMenu menus={menuComponents} /> */}
            <AdminDashContent schoolID={params['schoolID']}/>
       </div>
    );
}