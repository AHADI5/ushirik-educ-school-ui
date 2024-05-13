import React from 'react';

const TimeAgo = ({ dateString }) => {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.round((now - date) / 1000);
  const minutesAgo = Math.round(secondsAgo / 60);
  const hoursAgo = Math.round(minutesAgo / 60);
  const daysAgo = Math.round(hoursAgo / 24);

  let timeAgo;

  if (secondsAgo < 60) {
    timeAgo = 'instant';
  } else if (minutesAgo < 60) {
    timeAgo = ` il y a ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''}`;
  } else if (hoursAgo < 24) {
    timeAgo = `il y a ${hoursAgo} heures${hoursAgo > 1 ? 's' : ''} `;
  } else if (daysAgo < 7) {
    timeAgo = `il y a ${daysAgo} jour${daysAgo > 1 ? 's' : ''} `;
  } else {
    // If the date is not recent, you can format it more traditionally, or adjust as needed
    timeAgo = date.toLocaleDateString();
  }

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
