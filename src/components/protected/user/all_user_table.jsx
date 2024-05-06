import TableWithPagination from "../../common/utilities/table_pagination";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { users } from "../../../services/users_service";

export default function AllUser() {
    const params = useParams()
    const [allusers , setUsers] = useState([])
    useEffect(() => {
        async function fetchData() {
          
          try {
            const allUser = await users(params['schoolID']);
            setUsers(allUser)
            console.log("data received", allUser)
            
          } catch (error) {
            console.error('Error in fetching recent users:', error);
          }
       
        }
    
        fetchData();
      }, params['schoolID']);

   
    const columns = [
        { header: 'NOM', accessor: 'firstName' },
        { header: 'Email', accessor: 'email' },
        { header: 'ROLE', accessor: 'role' },
        { header: 'DATE', accessor: 'createdAt' },
        { header: 'STATUS', accessor: 'enabled' },
        { header: 'ACTIONS', accessor: 'action' },
        // Add more column definitions here
      ];
    return  (
        <>
            <div className="ml-44 mr-3 mt-20">
                
                <TableWithPagination rows={allusers} columns={columns}/>
            </div>
        </>
    )
}

