import React, { useState, useEffect } from 'react';
import { EditNoteOutlined } from '@mui/icons-material';
import CreateCommuniqueModal from './add_communique_modal';
import { DataGrid } from '@mui/x-data-grid';
import DateService from '../../../services/date_service';
import { useNavigate, useParams } from 'react-router-dom';



const columns = [
  { field: 'title', headerName: 'Objet', width: 170 },
  { field: 'content', headerName: 'Contenu', width: 300 },
  { field: 'publishedDate', headerName: 'Date', width: 120 },
  { field: 'reach', headerName: 'PORTEE', width:  120},
];

const CommunicationsList = ({ communications, fetchUpdatedData }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommunique, setSelectedCommunique] = useState(null);
  const params = useParams()
  const navigate = useNavigate()

  const handleOpenModal = (communique) => {
    setSelectedCommunique(communique);
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

  // Add unique id to each communication
  const rows = communications.map((communication) => ({
    id: communication.communiqueID,
    title: communication.title,
    content: communication.content,
    publishedDate: DateService.formatDate(communication.publishedDate),
    recipients  : communication.recipients,
    reach: communication.recipientType,
  }));

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
      <div className="bg-white communique relative rounded my-6" style={{ zIndex: 1 }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onRowClick={(row) => handleCommunique(row)}
          />
        </div>
      </div>
      <CreateCommuniqueModal isOpen={isModalOpen} onClose={handleCloseModal} selectedCommunique={selectedCommunique} />
    </div>
  );
};

export default CommunicationsList;
