import { useState, useEffect } from "react";
import instance from "./axios";
import { useParams } from "react-router-dom";

const useClassroomData = (schoolID) => {
    const param = useParams()

  // Set all Classrooms state variable to an empty array
  const [allClassrooms, setAllClassrooms] = useState([]);
  // Set Classrooms added today state variable to an empty array


  const fetchData = async () => {
    setIsLoading(true);
    try {
    //

      // Fetch top five recent Classrooms
      const topClassroomsResponse = await instance.get(`/api/v1/auth/${schoolID}/recent-Classrooms`);
      setTopClassrooms(topClassroomsResponse.data);

      // Fetch all Classrooms
      const allClassroomsResponse = await instance.get(`/api/v1/auth/${schoolID}/Classrooms`);
      setAllClassrooms(allClassroomsResponse.data);

      // Fetch Classrooms added today
      const ClassroomsAddedTodayResponse = await instance.get(`/api/v1/auth/${schoolID}/Classroom-created-today`);
      setClassroomsAddedToday(ClassroomsAddedTodayResponse.data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [schoolID]); // Watch for changes in schoolID

  const createClassroom = async (newClassroomData) => {
    try {
      // Send a POST request to create a new Classroom
      const response = await instance.post(`/api/v1/teacher/new-teacher`, newClassroomData);
      if (response.status === 200) {
        console.log('Classroom created successfully');
        // Refresh data after creating Classroom
        fetchData();
      } else {
        console.error('Failed to create Classroom');
      }
    } catch (error) {
      console.error('Error creating Classroom:', error);
    }
  };

  const modifyClassroom = async (ClassroomID, newData) => {
    try {
      // Send a PUT request to modify an existing Classroom
      const response = await instance.put(`/api/v1/auth/edit-Classroom/${ClassroomID}`, newData);
      if (response.status === 200) {
        console.log('Classroom modified successfully');
        // Refresh data after modifying Classroom
        // fetchData();
      } else {
        console.error('Failed to modify Classroom');
      }
    } catch (error) {
      console.error('Error modifying Classroom:', error);
    }
  };

  return { topClassrooms, allClassrooms, ClassroomsAddedToday, isLoading, createClassroom, modifyClassroom };
};

export default useClassroomData;
