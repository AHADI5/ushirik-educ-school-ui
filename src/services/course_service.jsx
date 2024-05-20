import instance from './axios';
const BASE_URL = 'api/v1/courses/';

const CourseService = {
  // Fetch all Courses 
  getCourses: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/getCoursesBySchoolID`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Courses:', error);
      throw new Error('Failed to fetch Courses');
    }
  },

  createCourse: async (courseData) => {
    try {
      const response = await instance.post(`${BASE_URL}/register-new-course`, courseData);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw new Error('Failed to create course');
    }
  },

  updateCourse: async (courseID, courseData) => {
    try {
      const response = await instance.put(`${BASE_URL}/${courseID}/updateCourse`, courseData);
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw new Error('Failed to update course');
    }
  },

  deleteCourse: async (courseID) => {
    try {
      const response = await instance.delete(`${BASE_URL}/${courseID}/deleteCourse`);
      return response.data;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw new Error('Failed to delete course');
    }
  },

  getCourseCategory: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/getAllCoursesCategory`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course categories:', error);
      throw new Error('Failed to fetch course categories');
    }
  },
};

export default CourseService;
