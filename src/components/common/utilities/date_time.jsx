import React from 'react';

export default function FormatDateAndTime({datetimestring}) {
  const date = new Date(datetimestring);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return (
    <div>
      <p>{`${year}-${month}-${day}`}</p>
      <p>{`${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
}