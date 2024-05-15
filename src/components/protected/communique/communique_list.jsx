import React, { useState } from 'react';
import { EditNoteOutlined } from '@mui/icons-material';
import CreateCommuniqueModal from './add_communique_modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Objet', minWidth: 170 },
  { id: 'contenu', label: 'Contenu', minWidth: 300 },
  { id: 'date', label: 'Date', minWidth: 20 },
];

const CommunicationsList = ({ communications }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search communique..."
          className="border border-gray-300 rounded py-2 px-4"
        />
        <button className="own-styled flex justify-center items-center gap-3" onClick={handleOpenModal}>
          <EditNoteOutlined className="flex justify-center items-center"/> <p className="flex justify-center"><span>nouveau</span></p>
        </button>
      </div>
      <div className="bg-white communique  rounded my-6">
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {communications.map((communication, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{communication.title}</TableCell>
                  <TableCell>{communication.content}</TableCell>
                  <TableCell>{communication.publishedDate}</TableCell>
                  <TableCell>
                    {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${communication.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {communication.active ? 'Active' : 'Inactive'}
                    </span> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <CreateCommuniqueModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CommunicationsList;
