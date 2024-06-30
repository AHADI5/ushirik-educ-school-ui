import instance from './axios';
const BASE_URL = 'api/v1/classroom/';
const BASE_URL2 = 'api/v1/student/'

const StudentService = {
  // Fetch all Students section
  getStudentSection: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/get-section`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Students:', error);
      throw new Error('Failed to fetch Students');
    }
  },

  getRecentStudent: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}//recentStudents`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Students:', error);
      throw new Error('Failed to fetch Students');
    }
  },



  getStudentStats: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/get-student-stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Students stats:', error);
      throw new Error('Failed to fetch Studens Stats ');
    }
  },


  //Fetch all disponible levels 

  getDisponibleLevels: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/StudentLevels`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Students levels:', error);
      throw new Error('Failed to fetch Students levels');
    }
  },


  //Fetch all ParentEmails 
//   getStudents: async (schoolID) => {
//     try {
//       const response = await instance.get(`${BASE_URL}/${schoolID}/getAllStudents`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching Students levels:', error);
//       throw new Error('Failed to fetch Students levels');
//     }
//   },

   // Fetch all Students 
   getStudents: async (classRoomID) => {
    try {
      const response = await instance.get(`${BASE_URL2}/${classRoomID}/students`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Students:', error);
      throw new Error('Failed to fetch Students');
    }
  },

  // Create a new Student option
  createStudent: async (StudentData) => {
    try {
      const response = await instance.post(`${BASE_URL2}/register-student`, StudentData);
      return response.data;
    } catch (error) {
      console.error('Error creating Student:', error);
      throw new Error('Failed to create Student');
    }
  },



  // Update an existing Student
  // updateStudent: async (schoolID, StudentId, updatedStudentData) => {
  //   try {
  //     const response = await instance.put(`${BASE_URL}/${schoolID}/${StudentId}`, updatedStudentData);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error updating Student:', error);
  //     throw new Error('Failed to update Student');
  //   }
  // },

  // Delete a Student
  // deleteStudent: async (schoolID, StudentId) => {
  //   try {
  //     await instance.delete(`${BASE_URL}/${schoolID}/${StudentId}`);
  //   } catch (error) {
  //     console.error('Error deleting Student:', error);
  //     throw new Error('Failed to delete Student');
  //   }
  // },
};

export default StudentService;
