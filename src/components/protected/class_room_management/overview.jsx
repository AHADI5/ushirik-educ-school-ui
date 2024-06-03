import React, { useState, useEffect } from 'react';
import AttendanceBarChart from "../charts/student_attendance";
import StudentGenderChart from "../charts/students_gender";
import { useParams } from "react-router-dom";
import { IconButton, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import TeacherService from '../../../services/teacher_service';
import ClassroomService from '../../../services/class_room_service';
import { getSchoolType } from '../../../services/school_service';
import instance from '../../../services/axios';

const getCurrentTitularTeacher = async (classID) => {
  const teacher = await ClassroomService.getClassRoomTitular(classID);
  console.log("teacher titular", teacher);
  return teacher; 
};

export default function Overview() {
  const { schoolID, classID } = useParams();
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [showSelectBox, setShowSelectBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [schoolType, setSchoolType] = useState('');
  const [isFetchingCurrentTeacher, setIsFetchingCurrentTeacher] = useState(false);
  const [isFetchingTeachers, setIsFetchingTeachers] = useState(false);
  const [isFetchingSchoolType, setIsFetchingSchoolType] = useState(false);

  useEffect(() => {
    async function fetchSchoolType() {
      setIsFetchingSchoolType(true);
      try {
        const type = await getSchoolType(schoolID);
        setSchoolType(type);
        const teacher = await getCurrentTitularTeacher(classID, type);
        setCurrentTeacher(teacher);
      } catch (error) {
        console.error('Error fetching school type:', error);
      } finally {
        setIsFetchingSchoolType(false);
      }
    }
    fetchSchoolType();
  }, [schoolID, classID]);

  useEffect(() => {
    async function fetchTeachers() {
      setIsFetchingTeachers(true);
      try {
        const response = await TeacherService.getTeachers(schoolID);
        setTeachers(response);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setIsFetchingTeachers(false);
      }
    }
    fetchTeachers();
  }, [schoolID]);

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleAssignTeacher = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = {
      schoolID: parseInt(schoolID),
      classID: parseInt(classID),
      teacherID: parseInt(selectedTeacher),
      schoolType: schoolType
    };

    try {
      console.log(formData);
      await instance.post('/api/v1/classroom/assignTitular', formData);
      const assignedTeacher = teachers.find(teacher => teacher.id === parseInt(selectedTeacher));
      setCurrentTeacher(assignedTeacher);
    } catch (error) {
      console.error('Error assigning teacher:', error);
    } finally {
      setIsLoading(false);
      setShowSelectBox(false);
    }
  };

  const toggleSelectBox = () => {
    setShowSelectBox(!showSelectBox);
  };

  if (isFetchingSchoolType) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-gray-100 p-4 rounded-lg shadow h-48 overflow-auto">
          <p className="text-lg font-semibold">Informations sur la classe</p>
          {isFetchingCurrentTeacher ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <p className="mt-4 text-md font-semibold text-gray-700">Enseignant titulaire actuel :</p>
              <div className="flex items-center mt-2">
                <p className="mr-4">
                  <span className="font-bold">{currentTeacher ? `${currentTeacher.name}` : 'Aucun assigné'}</span>
                </p>
                <IconButton onClick={toggleSelectBox} color="primary">
                  {showSelectBox ? <CloseIcon /> : <EditIcon />}
                </IconButton>
              </div>
              {showSelectBox && (
                <form onSubmit={handleAssignTeacher} className="flex items-center mt-4">
                  <FormControl variant="outlined" className="mr-2" size="small" style={{ minWidth: 200 }}>
                    <InputLabel id="teacher-label">Sélectionnez un enseignant</InputLabel>
                    <Select
                      labelId="teacher-label"
                      id="teacher"
                      value={selectedTeacher}
                      onChange={handleTeacherChange}
                      label="Sélectionnez un enseignant"
                    >
                      <MenuItem value="">
                        <em>Aucun</em>
                      </MenuItem>
                      {teachers.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.firstName} {teacher.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Assigner'}
                  </Button>
                </form>
              )}
            </>
          )}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow h-48 overflow-auto">
          <p className="text-lg font-semibold">Répartition par genre</p>
          <StudentGenderChart />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gray-100 p-4 rounded-lg shadow h-48 overflow-auto">
          <p className="text-lg font-semibold">Présences</p>
          <AttendanceBarChart />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow h-48 overflow-auto">
          <p className="text-lg font-semibold">Absents aujourd'hui</p>
        </div>
      </div>
    </>
  );
}
