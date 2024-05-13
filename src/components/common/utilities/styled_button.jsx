import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus , faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const StyledButton = ({ text }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded inline-flex items-center text-sm w-28 mb-2">
      <FontAwesomeIcon icon={faFileCirclePlus} />
      <span className="ml-2">{text}</span>
    </button>
  );
};