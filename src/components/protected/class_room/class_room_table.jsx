import React, { useState, useEffect } from 'react';
import useSchoolData from '../../../services/school_';
import { useParams } from 'react-router-dom';
import CustomModalAddClassRoom from './add_classroom_modal';
import RegisterClassRoomModal from './add_classroom_modal';
import ClassroomService from '../../../services/class_room_service';

const ClassroomTable = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const { school, isLoading, error } = useSchoolData(params['schoolID']);
  const [isModalOpen , setIsModalOpen] = useState(false);
  const [classRooms , setClassrooms] = useState([]);
  
  // This state is for managing form fields data
  const [fields, setFields] = useState([{ selectValue: "", numberValue: "", optionsValue: "" }]); 

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredClassrooms.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredClassrooms.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await ClassroomService.getClassrooms(params['schoolID']);
        console.log("ClassRooms " , response)
        setClassrooms(response);
        setFilteredClassrooms(response); // Initialize filteredClassrooms with fetched data
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };

    fetchClassrooms();
  }, [params['schoolID']]);

  // Search and filter function
  useEffect(() => {
    if (classRooms) {
      let results = classRooms;
      if (searchTerm) {
        results = results.filter(row =>
          row.classID.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (filterTerm) {
        results = results.filter(row => row.level === filterTerm);
      }
      setFilteredClassrooms(results);
    }
  }, [searchTerm, filterTerm, classRooms]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addField = () => {
    setFields([...fields, { selectValue: "", numberValue: "", optionsValue: "" }]);
  };

  const handleSelectChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].selectValue = value;
    setFields(updatedFields);
  };
  const handleOptionChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].optionsValue = value;
    setFields(updatedFields);
  };
  


  const handleNumberChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].numberValue = value;
    setFields(updatedFields);
  };

  const handleOptionsChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].optionsValue = value;
    setFields(updatedFields);
  };

  const handleSubmit = () => {
    // Handle form submission here

    // Gather data, transform classRoom to list
    console.log("Form submitted", fields);
    // Close the modal after form submission
    setIsModalOpen(false);
  };

  function transformInLetter(number) {
    var letter;
    switch (number) {
        case 1:
            letter = 'PREMIERE';
            break;
        case 2:
            letter = 'DEUXIEME';
            break;
        case 3:
            letter = 'TROISIEME';
            break;
        case 4:
            letter = 'QUATRIEME';
            break;
        case 5:
            letter = 'CINQUIEME';
            break;
        case 6:
            letter = 'CINQUIEME';
            break;
        default:
            break;
    }
    return letter;
  }

  return (
    <div className="">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:border-blue-400"
        />
        <select
          value={filterTerm}
          onChange={e => setFilterTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:border-blue-400"
        >
          <option value="">All</option>
          {school && school.schoolType === "PRIMARY" && (
            <>
              <option value="1">PREMIERE</option>
              <option value="2">DEUXIEME</option>
              <option value="3">TROISIEME</option>
              <option value="4">QUATRIEME</option>
              <option value="5">CINQUIEME</option>
              <option value="6">SIXIEME</option>
              {/* Add other primary school options as necessary */}
            </>
          )}
          {school && school.schoolType === "SECONDARY" && (
            <>
              <option value="7">SEPTIEME</option>
              <option value="8">HUITIEME</option>
              <option value="1">PREMIERE</option>
              <option value="2">DEUXIEME</option>
              <option value="3">TROISIEME</option>
              <option value="4">QUATRIEME</option>
              {/* Add other secondary school options as necessary */}
            </>
          )}
          {/* Add other school types and their respective options as needed */}
        </select>
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Nouvelless classes
        </button>
      </div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 text-gray-500 text-sm">
          <tr>
            <th className="px-4 py-2 text-left">Class ID</th>
            <th className="px-4 py-2 text-left">Niveau</th>
            <th className="px-4 py-2 text-left">Lettre</th>
            <th className="px-4 py-2 text-left">Option</th>
            <th className="px-4 py-2 text-left">Nombres des cours</th>
            <th className="px-4 py-2 text-left">Nombre des eleves</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {currentRows.length > 0
            ? currentRows.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{row.classRoomID}</td>
                <td className="px-4 py-2"> {transformInLetter(row.level)}</td>
                <td className="px-4 py-2">{row.letter}</td>
                <td className="px-4 py-2">{row.studentNumber}</td>
                <td className="px-4 py-2">{row.courseNumber}</td>
                <td className="px-4 py-2">{row.optionName}</td>
              </tr>
            ))
            : <tr>
              <td colSpan="3" className="text-center py-4">
                Aucune classe Enregistrée
              </td>
            </tr>}
        </tbody>
      </table>
      {classRooms && classRooms.length > 0 &&
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex list-style-none">
              {pageNumbers.map(number => (
                <li key={number} className="mx-1">
                  <a
                    onClick={() => paginate(number)}
                    href="#!"
                    className="page-link relative block py-1.5 px-3 border border-gray-300 bg-white leading-tight text-gray-800 hover:bg-gray-100"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>}
      {isModalOpen && (
        <RegisterClassRoomModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          fields={fields}
          onAddField={addField}
          onSelectChange={handleSelectChange}
          onNumberChange={handleNumberChange}
         
          onSubmit={handleSubmit}
          onOptionChange={handleOptionChange}
        />
      )}
    </div>
  );
};

export default ClassroomTable;
