import React, { useState, useEffect } from 'react';

const ClassroomTable = ({ classrooms }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerm, setFilterTerm] = useState('');
    const [filteredClassrooms, setFilteredClassrooms] = useState([]);

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

  return (
    <div className="ml-44 mr-3 mt-20">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select value={filterTerm} onChange={e => setFilterTerm(e.target.value)}>
        <option value="">All</option>
        <option value="1">Primary School 1</option>
        <option value="2">Primary School 2</option>
        {/* Add other options as necessary */}
      </select>
      <button onClick={() => {/* Add classroom */}}>Add Classroom</button>
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
    </div>
  );
};

export default ClassroomTable;
