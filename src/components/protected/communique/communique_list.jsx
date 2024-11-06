import React, { useState } from 'react';
import { EditNoteOutlined } from '@mui/icons-material';
import CreateCommuniqueModal from './add_communique_modal';
import { DataGrid } from '@mui/x-data-grid';
import DateService from '../../../services/date_service';
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
  { field: 'title', headerName: 'Objet', width: 170 },
  { field: 'content', headerName: 'Contenu', width: 300 },
  { field: 'channel', headerName: 'Canal', width: 150 },
  { field: 'status', headerName: 'Statut', width: 120 },
  { field: 'publishedDate', headerName: 'Date', width: 120 },
  { field: 'reach', headerName: 'PORTEE', width: 120 },
];

const CommunicationsList = ({ communications, fetchUpdatedData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommunique, setSelectedCommunique] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setSelectedCommunique(null); // Clear the selected communique when opening modal
    setIsModalOpen(true);
  };

  const handleCommunique = (row) => {
    const selectedCommunique = rows.find((communique) => communique.id === row.id);
    navigate(`/schoolDirection/${params['schoolID']}/communique-all/${selectedCommunique.id}`, { state: { communiqueData: selectedCommunique } });
  };

  const handleCloseModal = () => {
    setSelectedCommunique(null);
    setIsModalOpen(false);
    fetchUpdatedData(); // Trigger list refresh
  };

  // Add unique id to each communication and include channel and status
  const rows = communications.map((communication) => ({
    id: communication.communiqueID,
    title: communication.title,
    content: communication.content,
    channel: communication.channel, // Assuming this field exists in your data
    status: communication.status, // Assuming this field exists in your data
    publishedDate: DateService.formatDate(communication.publishedDate),
    reach: communication.recipientType,
  }));

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search communique..."
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          onClick={handleOpenModal}
        >
          <EditNoteOutlined /> <span>Nouvelle Communication</span>
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            onRowClick={(row) => handleCommunique(row)}
            sx={{
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e0e0e0',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f1f1f1',
              },
            }}
          />
        </div>
      </div>
      <CreateCommuniqueModal isOpen={isModalOpen} onClose={handleCloseModal} selectedCommunique={selectedCommunique} />
    </div>
  );
};

export default CommunicationsList;
