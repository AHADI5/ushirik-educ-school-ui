import instance from './axios';
const BASE_URL = 'api/v1/teacher/';

const TeacherService = {
   // Fetch all Teachers 
   getTeachers: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/getTeachersBySchoolID`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Teachers:', error);
      throw new Error('Failed to fetch Teachers');
    }
  },

};

export default TeacherService;
