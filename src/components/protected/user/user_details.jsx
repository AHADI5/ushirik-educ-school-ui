import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormatDateAndTime from '../../common/utilities/date_time';
import instance from '../../../services/axios';

const UserDetails = () => {
  // Access location state
  const location = useLocation();
  const { row } = location.state;

  // State for the edit mode
  const [editMode, setEditMode] = useState(false);
  const [rowData, setRowData] = useState(row); // State for row data

  const name = `${rowData.firstName} ${rowData.lastName}`;

  const deactivateUser = async (userName) => {
    try {
      // Send request to deactivate user
      await instance.put(`/api/v1/auth/${userName}/disableUser`);
      // Update user status in state
      setRowData({ ...rowData, enabled: false }); // Update rowData state
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  // Function to activate a user
  const activateUser = async (userName) => {
    try {
      // Send request to activate user
      await instance.put(`/api/v1/auth/${userName}/enableUser`);
      // Update user status in state
      setRowData((prevRow) => ({
        ...prevRow,
        enabled: true,
      })); // Update rowData state
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  return (
    <div className="mt-16 ml-60 items-center flex justify-center">
      <div className="mt-8">
        <div className="text-2xl font-bold mb-4">
          {name}
        </div>
        <p className="mb-10 font-bold">{rowData.email}</p>
        <div className="flex gap-20 ">
          <div className="flex gap-4">
            <Avatar name={name} size="50" />
            <div>
              <p>Role</p>
              <span>{rowData.role}</span>
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <p>Status</p>
              {rowData.enabled
                ? (
                  <button
                    onClick={() => deactivateUser(rowData.email)}
                    className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500"
                  >
                    <FontAwesomeIcon
                      icon={['fas', 'check-circle']}
                      className="flex-shrink-0 size-3"
                    />
                    Connected
                  </button>
                )
                : (
                  <button
                    onClick={() => activateUser(rowData.email)}
                    className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500"
                  >
                    <FontAwesomeIcon
                      icon={['fas', 'exclamation-triangle']}
                      className="flex-shrink-0 size-3"
                    />
                    Attention
                  </button>
                )}
            </div>
          </div>
        </div>
        {/* Render the data */}
        <div className="flex gap-20 mt-4">
          <div>
            <p className="pb-4">Joined</p>
            <p><FormatDateAndTime datetimestring={rowData.createdAt} /></p>
          </div>
          <div>
            <p className="pb-4">Last Login</p>
            <p><FormatDateAndTime datetimestring={rowData.createdAt} /></p>
          </div>
        </div>

        <div className="flex gap-20 mt-4">
          <div>
            <p className="pb-4">Validite</p>
            <p>
              {' '}
              <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${rowData.accountNonExpired ? 'bg-teal-500 text-white' : 'bg-red-500 text-white'}`}>
                {rowData.accountNonExpired ? 'Valide' : 'Non valide'}
              </span>
            </p>
          </div>
          <div>
            <p className="pb-4">Etat</p>
            <p>
              {' '}
              <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${rowData.accountNonExpired ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'}`}>
                {rowData.accountNonExpired ? 'Ouvert' : 'Bloqué'}
              </span>
            </p>
          </div>
        </div>

        {/* <p>Email: {rowData.email}</p> */}
        {/* Render other data as needed */}
      </div>
    </div>
  );
};

export default UserDetails;
