import React from 'react';
import { useState } from 'react';
import { EditNoteOutlined } from '@mui/icons-material';
import CreateCommuniqueModal from './add_communique_modal';

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
        <table className="min-w-full table-auto">
          <thead >
            <tr>
              <th className="px-6 py-3   text-left   tracking-wider text-sm font-light">Objet</th>
              <th className="px-6 py-3   text-left   tracking-wider text-sm font-light">Chaine</th>
              <th className="px-6 py-3   text-left   tracking-wider text-sm font-light">Destinataires</th>
              <th className="px-6 py-3  text-left   tracking-wider text-sm font-light">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {communications.map((communication, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {communication.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {communication.channel}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {communication.recipients}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${communication.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {communication.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateCommuniqueModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CommunicationsList;
