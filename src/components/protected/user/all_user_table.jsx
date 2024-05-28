import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useParams, useNavigate } from 'react-router-dom';
import useUserData from '../../../services/users_service';
import FormatDateAndTime from '../../common/utilities/date_time';
import { Oval } from 'react-loader-spinner';

export default function AllUser() {
    const { schoolID } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const { allUsers, isLoading } = useUserData(schoolID);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        setFilteredUsers(allUsers);
    }, [allUsers]);

    useEffect(() => {
        const results = allUsers.filter(user =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, allUsers]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Define columns for DataGrid
    const columns = [
        { field: 'firstName', headerName: 'NOM', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'ROLE', width: 150 },
        { field: 'createdAt', headerName: 'DATE', width: 180, 
          renderCell: (params) => <FormatDateAndTime datetimestring={params.value} /> },
        { field: 'enabled', headerName: 'STATUS', width: 120, 
          renderCell: (params) => (params.value ? 'ACTIVE' : 'DISABLED') },
    ];

    // Transform rows for DataGrid
    const rows = filteredUsers.map((user, index) => ({
        id: index,
        ...user,
    }));

    // Handle row click to navigate to user detail page
    const handleRowClick = (row) => {
        navigate(`/schoolAdmin/${schoolID}/users/${row.id}`, { state: { user: row } });
    };

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Oval color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className='ml-44 mt-16'>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <div style={{ height: 500, width: '99%', marginLeft: '44px', marginRight: '3px', marginTop: '20px' }}>
                {rows.length > 0 ? (
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection={false}
                        disableSelectionOnClick
                        onRowClick={(row) => handleRowClick(row)} // Pass row directly to handleRowClick
                        // getRowClassName={(params) => 
                        //     params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
                        // }
                    />
                ) : (
                    <div className='flex justify-center items-center h-full'>
                        Aucun utilisateur trouvé
                    </div>
                )}
            </div>
            <style jsx global>{`
                .even-row {
                    background-color: #f5f5f5;
                }
            `}</style>
        </div>
    );
}
