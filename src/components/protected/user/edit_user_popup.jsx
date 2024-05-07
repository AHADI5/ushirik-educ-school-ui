import React, { useState } from 'react';

const CustomModal = ({ user, onClose }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can call the function to update the user information in your backend
    // After updating the user information, you can call onClose to close the modal
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white border shadow-sm rounded-xl">
        <div className="flex justify-between items-center py-3 px-4 border-b">
          <h3 className="font-bold text-gray-800">
            Modal title
          </h3>
          <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100" onClick={onClose}>
            <span className="sr-only">Close</span>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="max-w-sm space-y-3">
              <input type="text" name="firstName" value={editedUser.firstName} onChange={handleInputChange} className="py-3 px-4 block w-full border border-gray-500 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="First Name" />
              <input type="text" name="lastName" value={editedUser.lastName} onChange={handleInputChange} className="py-3 px-4 block w-full border border-gray-500 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Last Name" />
              <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} className="py-3 px-4 block w-full border border-gray-500 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Email" />
              
              <input type="submit" value="Submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
