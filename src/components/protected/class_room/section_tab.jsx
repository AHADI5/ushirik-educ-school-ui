import React, { useState, useEffect } from 'react';
import CustomModalAddOption from './add_section_modal';
import ClassroomService from '../../../services/class_room_service';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
const SectionTab = ({ school }) => {
  const [showModal, setShowModal] = useState(false);
  const [classroomOptions, setClassroomOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const params = useParams();
  const { schoolID } = params;

  useEffect(() => {
    fetchClassroomOptions();
  }, []);

  const fetchClassroomOptions = async () => {
    try {
      const options = await ClassroomService.getClassroomSection(schoolID);
      setClassroomOptions(options);
      console.log("Classroom options" , options)
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

  return (
    <div className="max-w-md mx-auto">
      {loading ? (
        <div className="flex items-center justify-center">
        <TailSpin
          visible={true}
          height="30"
          width="30"
          color="rgb(255,255 ,255)"
          ariaLabel="tail-spin-loading"
          radius="0.5"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      ) : classroomOptions.length === 0 ? (
        <div>
          <p>No classroom options available. Please add new options.</p>
          <button onClick={openModal}>Add New Option</button>
          
        </div>
      ) : (
        <div>
          {/* Display existing options */}
          {classroomOptions.map((option, index) => (
            <div key={index}>{option.name}</div>
          ))}
          <button onClick={openModal}>Add New Option</button>
        </div>
      )}
      {showModal && <CustomModalAddOption onClose={closeModal} />}
    </div>
  );
};

export default SectionTab;
