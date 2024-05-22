import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import CourseForm from '../courses/courses_modal';
import TeacherService from '../../../services/teacher_service';
import CourseService from '../../../services/course_service';
import { useParams } from 'react-router-dom';

const fetchTeachers = async (schoolID) => {
  const response = await TeacherService.getTeachers(schoolID);
  return response;
};

const fetchCourses = async (classID) => {
  const response = await CourseService.getClassRoomCourses(classID);
  return response;
};

const ClassRoomsCourses = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [addingNew, setAddingNew] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCourses = await fetchCourses(params.classID);
      setCourses(fetchedCourses);
    };
    fetchData();
  }, [params.classID]);

  const handleSave = async (newCourse) => {
    console.log("Data to send", newCourse)
    await CourseService.createCourse(newCourse);
    const fetchedCourses = await fetchCourses(params.classID);
    setCourses(fetchedCourses);
    setAddingNew(false);
  };

  const handleUpdate = async (updatedCourse) => {
    await CourseService.updateCourse(updatedCourse.id, updatedCourse);
    const fetchedCourses = await fetchCourses(params.schoolID);
    setCourses(fetchedCourses);
    setSelectedCourse(null);
  };

  const handleDelete = async (courseId) => {
    await CourseService.deleteCourse(courseId);
    const fetchedCourses = await fetchCourses(params.schoolID);
    setCourses(fetchedCourses);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCourseSelect = (event) => {
    const courseId = event.target.value;
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course);
  };

  const filteredCourses = courses.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? course.category === categoryFilter : true)
    );
  });

  return (
    <>
      {selectedCourse ? (
        <Box>
          <IconButton onClick={() => setSelectedCourse(null)}>
            <ArrowBackIcon />
          </IconButton>
          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select value={selectedCourse.courseID} onChange={handleCourseSelect}>
              {courses.map((course) => (
                <MenuItem key={course.courseID} value={course.courseID}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Assignments" />
            <Tab label="Timetable" />
            <Tab label="Tools" />
          </Tabs>
          {activeTab === 0 && (
            <Box>
              <Typography variant="body1">Assignments for {selectedCourse.name}</Typography>
              {/* Add assignments details here */}
            </Box>
          )}
          {activeTab === 1 && (
            <Box>
              <Typography variant="body1">Timetable for {selectedCourse.name}</Typography>
              {/* Add timetable details here */}
            </Box>
          )}
          {activeTab === 2 && (
            <Box>
              <Typography variant="body1">Tools for {selectedCourse.name}</Typography>
              {/* Add tools details here */}
            </Box>
          )}
        </Box>
      ) : addingNew ? (
        <CourseForm
          onSave={handleSave}
          onCancel={() => setAddingNew(false)}
        />
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Button variant="contained" color="primary" onClick={() => setAddingNew(true)} startIcon={<AddIcon />}>
              Add Courses
            </Button>
            <Box display="flex" gap={2}>
              <TextField
                size="small"
                label="Search"
                variant="outlined"
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
              <FormControl variant="outlined" size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                  {/* Add more categories as needed */}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 400 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Categorie</TableCell>
                  <TableCell>Credits</TableCell>
                  <TableCell>Evaluations</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.courseID} onClick={() => setSelectedCourse(course)} style={{ cursor: 'pointer' }}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.credit}</TableCell>
                    <TableCell>{course.assigmentNumber}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => { e.stopPropagation(); setSelectedCourse(course); }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(course.id); }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

export default ClassRoomsCourses;
