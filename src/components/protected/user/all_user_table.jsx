import TableWithPagination from "../../common/utilities/table_pagination";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserData from "../../../services/users_service";

export default function AllUser() {
    const params = useParams()
    const { topUsers, allUsers, usersAddedToday, isLoading } = useUserData(params['schoolID']);
    

   
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
                
                <TableWithPagination rows={allUsers} columns={columns}/>
            </div>
        </>
    )
}
