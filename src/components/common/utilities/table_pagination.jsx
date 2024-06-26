import React, { useState } from 'react';
import { formatDate } from './dates-management';
import { useNavigate, useParams } from 'react-router-dom'; // Import useHistory
import CustomModal from '../../protected/user/edit_user_popup';
import CustomModalAdd from '../../protected/user/add_user_popup'; // Import the custom add modal component
import { useEffect } from 'react';
import HeaderTable from './header_table';
import { Edit } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

const TableWithPagination = ({ columns, rows }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const usenavigate = useNavigate(); // Initialize useHistory
  const params = useParams()
  

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(rows.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Function to handle row click and navigate to personal page
  const handleRowClick = (userID, row) => {
    // Navigate to personal page with userId
    usenavigate(`/schoolAdmin/${params['schoolID']}/users/${userID}`, { state: { row } })

  };

  // Editing logic  
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false); // State to control the visibility of the add modal

  // Function to handle edit button click
  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  // Function to handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle add user
  const handleAddUser = () => {
    setShowAddModal(true); // Show the add modal when the add button is clicked
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResults(rows.filter(row => row.firstName.toLowerCase().includes(searchTerm.toLowerCase())));
  };
  


  return (
    <div className="container mx-auto">

      <HeaderTable onSearch={handleSearch} onAddUser={handleAddUser} />
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 text-gray-500 text-sm">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 text-left">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {currentRows.length > 0
            ? currentRows.map((row, index) => (
              <tr key={index} className="border-b" onClick={() => handleRowClick(row.userID, row)}> {/* Add onClick handler to row */}
                {columns.map(column => (
                  <td key={column.accessor} className="px-4 py-2">
                    {column.accessor === 'action'
                      ? <div className="flex gap-2 underline text-blue-500">
                        <FontAwesomeIcon icon={faUserEdit} onClick={() => handleEditClick(row)} className=" font-bold py-2 px-4 rounded" />
                      </div>
                      : column.accessor === 'enabled'
                        ? row[column.accessor] ? <span>ACTIVE</span> : <span>DISABLED</span>
                        : column.accessor === 'createdAt' ? formatDate(row[column.accessor])
                          : row[column.accessor]
                    }
                  </td>
                ))}
              </tr>
            ))
            : <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>}
        </tbody>
      </table>
      {rows.length > 0 &&
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex list-style-none">
              {pageNumbers.map(number => (
                <li key={number} className="mx-1">
                  <a
                    onClick={() => paginate(number)}
                    href="#!"
                    className="page-link relative block py-1.5 px-3 border border-gray-300 bg-white leading-tight text-gray-800 hover:bg-gray-100"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>}
     
      {showModal && (
        <CustomModal user={currentUser} onClose={handleCloseModal} />
      )}
      {showAddModal && ( // Render the add modal if showAddModal is true
        
        <CustomModalAdd onClose={() => setShowAddModal(false)} schoolID={params['schoolID']} />
      )}
    </div>
  );
};

export default TableWithPagination;
