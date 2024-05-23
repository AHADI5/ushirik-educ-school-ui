// CourseService.js
import instance from './axios';
const BASE_URL = 'api/v1/courses/';
const BASE_URL2 = 'api/v1/classroom/';
const CourseService = {
  // Fetch all Courses
  getCourses: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL2}/${schoolID}/getAllCourses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Courses:', error);
      throw new Error('Failed to fetch Courses');
    }
  },

  getClassRoomCourses: async (classID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${classID}/coursesByClassID`);
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

  AddCourseCategory: async (schoolID ,data) => {
    try {
      const response = await instance.post(`${BASE_URL}/${schoolID}/register-new-courseCategory` ,data );
      return response.data;
    } catch (error) {
      console.error('Error fetching course categories:', error);
      throw new Error('Failed to fetch course categories');
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

  assignCourse: async (data) => {
    try {
      const response = await instance.post(`${BASE_URL2}/courses/assign-course` , data);
      return response.data;
    } catch (error) {
      console.error('Error fetching course categories:', error);
      throw new Error('Failed to fetch course categories');
    }
  },

  getAllCoursesAssigned:async (teacherID) => {
    try {
      const response = await instance.get(`${BASE_URL2}/${teacherID}/getAllCoursesAssigned`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course categories:', error);
      throw new Error('Failed to fetch course categories');
    }
  },
};

export default CourseService;
