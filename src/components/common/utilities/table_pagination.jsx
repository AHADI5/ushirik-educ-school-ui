import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
const TableWithPagination = ({ columns, rows }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(rows.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto">
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
          {currentRows.length > 0 ? (
            currentRows.map((row, index) => (
              <tr key={index} className="border-b">
                {columns.map((column) => (
                  <td key={column.accessor} className="px-4 py-2">
                     {column.accessor === 'action' ?
                    <div className="flex gap-2 underline text-blue-500"><button>Modifier</button><button>supprimer</button></div>
                     : row[column.accessor] === 'status' ? `${row[column.accessor] ? 'ACTIVE' : 'DISABLED'}` :row[column.accessor]} 
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {rows.length > 0 && (
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex list-style-none">
              {pageNumbers.map((number) => (
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
        </div>
      )}
    </div>
  );
};

export default TableWithPagination;
