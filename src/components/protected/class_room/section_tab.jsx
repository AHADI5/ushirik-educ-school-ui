import React, { useState, useEffect } from 'react';

const SectionTab = ({ school }) => {
  const [sections, setSections] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [newSection, setNewSection] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Simulate fetching organized sections from the database
  useEffect(() => {
    // For demo purposes, hardcode the available sections based on school type
    let availableSections = [];
    if (school && school.schoolType === 'PRIMARY') {
      availableSections = ['Section A', 'Section B', 'Section C'];
    } else if (school && school.schoolType === 'SECONDARY') {
      availableSections = ['Cycle d\'orientation', 'Cycle terminal'];
    }
    setSections(availableSections);

    // Simulate loading selected sections from the database
    // In a real application, this data would be fetched from the backend
    const storedSelectedSections = localStorage.getItem('selectedSections');
    if (storedSelectedSections) {
      setSelectedSections(JSON.parse(storedSelectedSections));
    }
  }, [school]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedSections([...selectedSections, value]);
    } else {
      setSelectedSections(selectedSections.filter((section) => section !== value));
    }

    // Update selected sections in local storage
    localStorage.setItem('selectedSections', JSON.stringify(selectedSections));
  };

  const handleAddSection = () => {
    setShowModal(true);
  };

  const handleSaveSection = () => {
    if (newSection.trim() !== '') {
      setSections([...sections, newSection.trim()]);
      setSelectedSections([...selectedSections, newSection.trim()]);

      // Update selected sections in local storage
      localStorage.setItem('selectedSections', JSON.stringify(selectedSections));

      setShowModal(false);
      setNewSection('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNewSection('');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Section Selection</h2>
      <div className="space-y-2">
        <p className="font-semibold">Available Sections:</p>
        <div className="flex flex-wrap">
          {sections.map((section, index) => (
            <div key={index} className="mr-4 mb-2">
              <label>
                <input
                  type="checkbox"
                  value={section}
                  checked={selectedSections.includes(section)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {section}
              </label>
            </div>
          ))}
        </div>
      </div>
      {school && school.schoolType === 'SECONDARY' && (
        <div className="mt-4">
          <button onClick={handleAddSection} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
            Add New Section
          </button>
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Selected Sections:</h3>
        <ul className="list-disc list-inside">
          {selectedSections.map((section, index) => (
            <li key={index} className="ml-4">{section}</li>
          ))}
        </ul>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="relative bg-white rounded-lg p-8 max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Add New Section</h3>
            <input
              type="text"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              placeholder="New Section Name"
              className="border border-gray-300 rounded-md py-1 px-2 mb-4 w-full focus:outline-none focus:border-blue-400"
            />
            <div className="flex justify-end">
              <button onClick={handleSaveSection} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                Add
              </button>
              <button onClick={closeModal} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md ml-4 hover:bg-gray-400 focus:outline-none">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionTab;
