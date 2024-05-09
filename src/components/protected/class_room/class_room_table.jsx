import React, { useState, useEffect } from 'react';
import useSchoolData from '../../../services/school_';
import { useParams } from 'react-router-dom';
import CustomModalAddClassRoom from './add_classroom_modal';

const ClassroomTable = ({ classrooms }) => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const { school, isLoading, error } = useSchoolData(params['schoolID']);
  const [showModal, setShowModal] = useState(false);

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredClassrooms.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredClassrooms.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Search and filter function
  useEffect(() => {
    if (classrooms) {
      let results = classrooms;
      if (searchTerm) {
        results = results.filter(row =>
          row.classID.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (filterTerm) {
        results = results.filter(row => row.level === filterTerm);
      }
      setFilteredClassrooms(results);
    }
  }, [searchTerm, filterTerm, classrooms]);

  const handleAddClassroom = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:border-blue-400"
        />
        <select
          value={filterTerm}
          onChange={e => setFilterTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:border-blue-400"
        >
          <option value="">All</option>
          {school && school.schoolType === "PRIMARY" && (
            <>
              <option value="1">PREMIERE</option>
              <option value="2">DEUXIEME</option>
              <option value="3">TROISIEME</option>
              <option value="4">QUATRIEME</option>
              <option value="4">CINQUEME</option>
              <option value="4">SIXIEME</option>
              {/* Add other primary school options as necessary */}
            </>
          )}
          {school && school.schoolType === "SECONDARY" && (
            <>
              <option value="7">SEPTIEME</option>
              <option value="8">HUITIEME</option>
              <option value="1">PREMIERE</option>
              <option value="2">DEUXIEME</option>
              <option value="3">TROISIEME</option>
              <option value="4">QUATRIEME</option>
              {/* Add other secondary school options as necessary */}
            </>
          )}
          {/* Add other school types and their respective options as needed */}
        </select>
        <button
          onClick={handleAddClassroom}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Classroom
        </button>
      </div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 text-gray-500 text-sm">
          <tr>
            <th className="px-4 py-2 text-left">Class ID</th>
            <th className="px-4 py-2 text-left">Courses Number</th>
            <th className="px-4 py-2 text-left">Children Number</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {currentRows.length > 0
            ? currentRows.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{row.classID}</td>
                <td className="px-4 py-2">{row.coursesNumber}</td>
                <td className="px-4 py-2">{row.childrenNumber}</td>
              </tr>
            ))
            : <tr>
              <td colSpan="3" className="text-center py-4">
                No data available
              </td>
            </tr>}
        </tbody>
      </table>
      {classrooms && classrooms.length > 0 &&
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
        <CustomModalAddClassRoom onClose={closeModal} schoolID={params['schoolID']}/>
        // <div className="fixed inset-0 z-10 flex items-center justify-center">
        //   <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        //   <div className="relative bg-white rounded-lg p-8 max-w-lg w-full">
        //     <h3 className="text-lg font-semibold mb-4">Add New Classroom</h3>
        //     {/* Add form fields for adding a new classroom */}
        //     <div className="flex justify-end">
        //       <button onClick={closeModal} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md ml-4 hover:bg-gray-400 focus:outline-none">
        //         Cancel
        //       </button>
        //       {/* Add submit button for adding a new classroom */}
        //     </div>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default ClassroomTable;
