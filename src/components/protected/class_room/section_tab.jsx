import React, { useState, useEffect } from 'react';
import CustomModalAddOption from './add_section_modal';
import ClassroomService from '../../../services/class_room_service';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SectionTab = ({ school }) => {
  const [showModal, setShowModal] = useState(false);
  const [classroomOptions, setClassroomOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const params = useParams();
  const { schoolID } = params;

  useEffect(() => {
    fetchClassroomOptions();
  }, []);

  const fetchClassroomOptions = async () => {
    try {
      const options = await ClassroomService.getClassroomSection(schoolID);
      setClassroomOptions(options);
      console.log('Classroom options', options);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classroom options:', error);
      setLoading(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Refetch options when modal is closed to update the list if new options were added
    fetchClassroomOptions();
  };

  const toggleDescription = (index) => {
    setSelectedOption(selectedOption === index ? null : index);
  };

  return (
    <div className="max-w-md mx-auto">
      {loading ? (
        <div className="flex items-center justify-center">
          <TailSpin
            visible={true}
            height="30"
            width="30"
            color="rgb(255, 255, 255)"
            ariaLabel="tail-spin-loading"
            radius="0.5"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : classroomOptions.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="items-center mt-32">
          <p>Aucune option disponible</p>
          <button
            onClick={openModal}
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Add New Option
          </button>
          </div>
        </div>
      ) : (
        <div className=' mt-10'>
          {/* Display existing options */}
          {classroomOptions.map((option, index) => (
            <div key={index} className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={selectedOption === index ? faChevronUp : faChevronDown}
                    className="mr-2 cursor-pointer"
                    onClick={() => toggleDescription(index)}
                  />
                  <FontAwesomeIcon  icon={faCheckCircle} className="mr-3 ml-3 text-blue-400" />
                  <span>{option.name}</span>
                </div>
              </div>
              {selectedOption === index && (
                <div className="ml-10">
                  <p className="bg-slate-200 p-2 mt-3">{option.description}</p>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={openModal}
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Add New Option
          </button>
        </div>
      )}
      {showModal && <CustomModalAddOption onClose={closeModal} />}
    </div>
  );
};

export default SectionTab;
