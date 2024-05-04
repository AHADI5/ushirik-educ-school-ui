import React from 'react';

const AddButton = text => {
  return (
    <div className="flex justify-center w-80">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        {`${text.text}`}
      </button>
    </div>
  );
};

export default AddButton;
