import instance from './axios';
const BASE_URL = 'api/v1/classroom/';

const ClassroomService = {
  // Fetch all classrooms section
  getClassroomSection: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/get-section`);
      return response.data;
    } catch (error) {
      console.error('Error fetching classrooms:', error);
      throw new Error('Failed to fetch classrooms');
    }
  },

  //Fetch all disponible levels 

  getDisponibleLevels: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/classroomLevels`);
      return response.data;
    } catch (error) {
      console.error('Error fetching classrooms levels:', error);
      throw new Error('Failed to fetch classrooms levels');
    }
  },


  //Fetch all ParentEmails 
  getStudents: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/getAllStudents`);
      return response.data;
    } catch (error) {
      console.error('Error fetching classrooms levels:', error);
      throw new Error('Failed to fetch classrooms levels');
    }
  },

   // Fetch all classrooms 
   getClassrooms: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/classrooms`);
      return response.data;
    } catch (error) {
      console.error('Error fetching classrooms:', error);
      throw new Error('Failed to fetch classrooms');
    }
  },

  // Create a new classroom option
  createClassroomOption: async (schoolID, classroomData) => {
    try {
      const response = await instance.post(`${BASE_URL}/${schoolID}/new-classRoomOption`, classroomData);
      return response.data;
    } catch (error) {
      console.error('Error creating classroom:', error);
      throw new Error('Failed to create classroom');
    }
  },


  //Create new classroom 
  createClassroom: async (schoolID, classroomData) => {
    try {
      const response = await instance.post(`${BASE_URL}/${schoolID}/registerClassRoom`, classroomData);
      return response.data;
    } catch (error) {
      console.error('Error creating classroom:', error);
      throw new Error('Failed to create classroom');
    }
  },

  // Update an existing classroom
  // updateClassroom: async (schoolID, classroomId, updatedClassroomData) => {
  //   try {
  //     const response = await instance.put(`${BASE_URL}/${schoolID}/${classroomId}`, updatedClassroomData);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error updating classroom:', error);
  //     throw new Error('Failed to update classroom');
  //   }
  // },

  // Delete a classroom
  // deleteClassroom: async (schoolID, classroomId) => {
  //   try {
  //     await instance.delete(`${BASE_URL}/${schoolID}/${classroomId}`);
  //   } catch (error) {
  //     console.error('Error deleting classroom:', error);
  //     throw new Error('Failed to delete classroom');
  //   }
  // },
};

export default ClassroomService;
