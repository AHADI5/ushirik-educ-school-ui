import React, { useState, useEffect, useRef } from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';
import {
  Fab,
  Box,
  Typography,
  Modal,
  TextField,
  InputAdornment,
  MenuItem,
  IconButton,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MultiStepForm from '../students/multisteps_form';
import StudentService from '../../../services/student_service';

const fetchClassrooms = async () => {
  // Fetch classrooms
  return [
    { id: 1, name: 'Classroom 1' },
    { id: 2, name: 'Classroom 2' },
    // More classrooms
  ];
};

function ClassroomStudentList() {
  const params = useParams();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const studentListRef = useRef(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await StudentService.getStudents(params.classID);
      setStudents(response);
      setFilteredStudents(response);
    };
    fetchStudentData();
  }, [params.classID]);

  useEffect(() => {
    filterStudents();
  }, [searchTerm, genderFilter, students]);

  const filterStudents = () => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter((student) =>
        `${student.name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genderFilter) {
      filtered = filtered.filter((student) => student.gender === genderFilter);
    }

    setFilteredStudents(filtered);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setActiveTab(0); // Reset to the first tab on student selection
  };

  const handleFormSubmit = async (data) => {
    await StudentService.createStudent(data);
    setOpen(false);
    // Re-fetch students after adding
    const response = await StudentService.getStudents(params.classID);
    setStudents(response);
    setFilteredStudents(response);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const scrollStudentList = (direction) => {
    if (studentListRef.current) {
      const scrollAmount = direction === 'up' ? -100 : 100;
      studentListRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {selectedStudent === null ? (
          <div className="w-full bg-white p-4 shadow-lg overflow-hidden" style={{ height: '70vh' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Elèves</Typography>
              <Fab color="primary" size="small" aria-label="add" onClick={() => setOpen(true)}>
                <AddIcon />
              </Fab>
            </Box>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                size="small"
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                size="small"
                label="Filter by Gender"
                variant="outlined"
                fullWidth
                select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Box>
            <Box ref={studentListRef} sx={{ maxHeight: '50vh', overflowY: 'auto', marginTop: 2 }}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Parent
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Genre
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleStudentClick(student)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <NavLink
                          to={`/schoolDirection/${params.schoolID}/classrooms/${params.classID}/students/${student.studentID}`}
                          activeClassName="selected"
                        >
                          {student.name} {student.lastName}
                        </NavLink>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.parent.firstName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
              <Button onClick={() => scrollStudentList('up')}>
                <ArrowUpwardIcon />
              </Button>
              <Button onClick={() => scrollStudentList('down')}>
                <ArrowDownwardIcon />
              </Button>
            </Box>
          </div>
        ) : (
          <div className="w-full p-4">
            <Button onClick={() => setSelectedStudent(null)}>Back to Student List</Button>
            <Box>
              <Typography variant="h8">
                {selectedStudent.firstName} {selectedStudent.lastName}
              </Typography>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Identity" />
                <Tab label="Parent" />
                <Tab label="Grades" />
                <Tab label="Discipline" />
              </Tabs>
              <Box>
                {activeTab === 0 && (
                  <Box p={3}>
                    {/* General Info Content */}
                    <Typography>Name: {selectedStudent.name}</Typography>
                    <Typography>Last Name: {selectedStudent.lastName}</Typography>
                    <Typography>First Name: {selectedStudent.firstName}</Typography>
                    <Typography>Quarter: {selectedStudent.address.quarter}</Typography>
                    <Typography>Phone: {selectedStudent.address.avenue}</Typography>
                  </Box>
                )}
                {activeTab === 1 && (
                  <Box p={3}>
                    {/* Parent Info Content */}
                    <Typography>First Name: {selectedStudent.parent.firstName}</Typography>
                    <Typography>Last Name: {selectedStudent.parent.lastName}</Typography>
                    <Typography>Email: {selectedStudent.parent.email}</Typography>
                    <Typography>Phone: {selectedStudent.parent.phone}</Typography>
                  </Box>
                )}
                {activeTab === 2 && (
                  <Box p={3}>
                    {/* Grades Content */}
                    <Typography>Grades content goes here...</Typography>
                  </Box>
                )}
                {activeTab === 3 && (
                  <Box p={3}>
                    {/* Discipline Content */}
                    <Typography>Discipline content goes here...</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400, margin: '50px auto', padding: 4, backgroundColor: 'white' }}>
          <MultiStepForm onSubmit={handleFormSubmit} fetchClassrooms={fetchClassrooms} />
        </Box>
      </Modal>
    </>
  );
}

export default ClassroomStudentList;
