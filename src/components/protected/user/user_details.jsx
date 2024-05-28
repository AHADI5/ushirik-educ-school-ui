import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormatDateAndTime from '../../common/utilities/date_time';
import instance from '../../../services/axios';

const UserDetails = () => {
  // Access location state
  const location = useLocation();
  const { user } = location.state;

  // State for the edit mode
  const [editMode, setEditMode] = useState(false);
  const [userData, setuserData] = useState(user); // State for user data

  const name = `${userData.firstName} ${userData.lastName}`;

  const deactivateUser = async (userName) => {
    try {
      // Send request to deactivate user
      await instance.put(`/api/v1/auth/${userName}/disableUser`);
      // Update user status in state
      setuserData({ ...userData, enabled: false }); // Update userData state
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
      setuserData((prevuser) => ({
        ...prevuser,
        enabled: true,
      })); // Update userData state
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
        <p className="mb-10 font-bold">{userData.email}</p>
        <div className="flex gap-20 ">
          <div className="flex gap-4">
            <Avatar name={name} size="50" />
            <div>
              <p>Role</p>
              <span>{userData.role}</span>
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <p>Status</p>
              {userData.enabled
                ? (
                  <button
                    onClick={() => deactivateUser(userData.email)}
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
                    onClick={() => activateUser(userData.email)}
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
            <p><FormatDateAndTime datetimestring={userData.createdAt} /></p>
          </div>
          <div>
            <p className="pb-4">Last Login</p>
            <p><FormatDateAndTime datetimestring={userData.createdAt} /></p>
          </div>
        </div>

        <div className="flex gap-20 mt-4">
          <div>
            <p className="pb-4">Validite</p>
            <p>
              {' '}
              <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${userData.accountNonExpired ? 'bg-teal-500 text-white' : 'bg-red-500 text-white'}`}>
                {userData.accountNonExpired ? 'Valide' : 'Non valide'}
              </span>
            </p>
          </div>
          <div>
            <p className="pb-4">Etat</p>
            <p>
              {' '}
              <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${userData.accountNonExpired ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'}`}>
                {userData.accountNonExpired ? 'Ouvert' : 'Bloqué'}
              </span>
            </p>
          </div>
        </div>

        {/* <p>Email: {userData.email}</p> */}
        {/* Render other data as needed */}
      </div>
    </div>
  );
};

export default UserDetails;
