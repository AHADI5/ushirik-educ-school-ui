import React from 'react';

/**
 * StatBlock Component - Displays a single statistics block.
 * @param {Object} props - Contains all necessary data for the block (numbers, category, image, color).
 * @returns {JSX.Element} - A statistic block with an icon and numbers.
 */
export default function StatBlock({ numberAdded, numberGone, date, category, totalNumber, img, color }) {
  return (
    <div className={`p-4 rounded shadow-md ${color} text-white`}>
      <div className="flex items-center justify-between">
        <img src={img} alt={category} className="w-12 h-12 rounded-full" />
        <div className="text-right">
          <p className="text-2xl font-bold">{totalNumber}</p>
          <p>{category}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm">{numberAdded} ajouté(s) {date}</p>
        <p className="text-sm">{numberGone} parti(s)</p>
      </div>
    </div>
  );
}
