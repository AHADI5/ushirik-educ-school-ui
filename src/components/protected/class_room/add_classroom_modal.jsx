import React, { useState } from 'react';
import useUserData from '../../../services/users_service';
import { useParams } from 'react-router-dom';

const CustomModalAddClassRoom = ({ onClose , schoolID }) => {
    const params = useParams()
    const { createUser } = useUserData(schoolID);
    
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        schoolID: `${params['schoolID']}`,
        phone : '',
        address: {
          quarter: '',
          avenue: '',
        },
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quarter' || name === 'avenue') {
          setNewUser({
            ...newUser,
            address: {
              ...newUser.address,
              [name]: value,
            },
          });
        } else {
          setNewUser({
            ...newUser,
            [name]: value,
          });
        }
      };
    
      const handleSubmit = async (e) => {
        console.log(newUser)
        e.preventDefault();
        try {
          // Call the createUser function from the useUserData hook to add a new user
          await createUser(newUser);
          // Handle success, such as displaying a success message
          console.log('User added successfully');
          onClose();
        } catch (error) {
          // Handle error response
          console.error('Failed to add user:', error);
        }
      };


  return (
    <div className="p-4 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white border shadow-sm rounded-xl w-auto">
        <div className="flex justify-between items-center  mb-3 py-1.5 px-4 border-b">
          <h3 className="font-bold text-gray-800">
            Ajouter une Salle de Classe
          </h3>
          <button
            type="button"
            className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="max-w-md space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  className=" mb-3 py-1.5 px-4 block w-full border border-gray-500 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  className=" mb-3 py-1.5 px-4 block w-full border border-gray-500 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Last Name"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className=" mb-3 py-1.5 px-4 block w-full border border-gray-500 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  className=" mb-3 py-1.5 px-4 block w-full border border-gray-500 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Phone"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="quarter"
                  value={newUser.quarter}
                  onChange={handleInputChange}
                  className=" mb-3 py-1.5 px-4 block w-full border border-gray-500 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Quarter"
                />
                <input
                  type="text"
                  name="avenue"
                  value={newUser.avenue}
                  onChange={handleInputChange}
                  className=" mb-3 py-1.5 px-4 block w-full border border-gray-500 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Avenue"
                />
              </div>
              
              <input
                type="submit"
                value="Submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomModalAddClassRoom;
