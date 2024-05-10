import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import ClassroomService from '../../../services/class_room_service';

export default function RegisterClassRoomModal({
  isOpen,
  onClose,
  fields,
  onAddField,
  onSelectChange,
  onNumberChange,
  onSubmit,
  onOptionChange
}) {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        setLoading(true);
        // Fetch class options from the external service
        const response = await ClassroomService.getClassroomSection(param['schoolID']);
        setClassOptions(response);
        console.log(response)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching class options:', error);
        setLoading(false);
      }
    };

    fetchClassOptions();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Transform fields data into the desired format
      const formData = fields.flatMap((field, index) => {
        // Generate an array of objects for each selected level, its corresponding letters, and options
        const level = field.selectValue;
        const numberOfRooms = parseInt(field.numberValue, 10);
        const letters = Array.from({ length: numberOfRooms }, (_, roomIndex) =>
          String.fromCharCode(65 + roomIndex)
        );
        return letters.map(letter => ({
          level,
          letter,
          ClassRoomOptionID: field.optionsValue // Assuming optionsValue is added to fields
        }));
      });

      // Log the transformed data
      console.log('Form data:', formData);

      // Send formData to the server
      // await instance.post(`/api/v1/classroom/${param['schoolID']}/registerClassRoom`, formData); // Adjust the endpoint as needed
      const response = await ClassroomService.createClassroom(param['schoolID'] , formData);
      console.log(response)
      // Close the modal after successful submission
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Error submitting form data:', error);
      setLoading(false);
    }
  };

  return (
    isOpen &&
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className=" bg-white rounded-md shadow-md w-full max-w-lg p-6">
        <h2 className="text-lg font-bold mb-4 text-center">
          Ajouter des classes
        </h2>
        <div className="fields overflow-y-auto max-h-60">
          {fields.map((field, index) => (
            <div key={index} className="mb-4 flex items-center">
              <select
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                value={field.selectValue}
                onChange={e => onSelectChange(index, e.target.value)}
              >
                <option value="">Niveau</option>
                <option value="1">PREMIERE</option>
                <option value="2">DEUXIEME</option>
                <option value="3">TROISIEME</option>
                <option value="4">QUATRIEME</option>
                <option value="5">CINQUIEME</option>
                <option value="6">SIXIEME</option>
              </select>
              <input
                type="number"
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 ml-2"
                placeholder="Nombre des salles"
                value={field.numberValue}
                onChange={e => onNumberChange(index, e.target.value)}
              />
              <select
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                value={field.optionsValue} // Assuming optionsValue is added to fields
                onChange={e => onOptionChange(index, e.target.value)}
              >
                <option value="">Options</option>
                {classOptions.map((option, index) => (
                  <option key={index} value={option.classRoomOptionID}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            onClick={onAddField}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Field
          </button>
          <button
            className={`bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
