// services.js
import instance from "./axios";


// Define a function to fetch the school ID
export const getSchoolID = async () => {
    try {
      // Make a GET request to your backend API to retrieve the school ID
      const response = await instance.get(`/api/v1/school/director/schoolID`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching school ID:", error);
      throw new Error("Failed to fetch school ID");
    }
  };

  export const getSchoolType = async (schoolID) => {
    try {
      // Make a GET request to your backend API to retrieve the school ID
      const response = await instance.get(`/api/v1/school/${schoolID}/getSchoolType`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching school type:", error);
      throw new Error("Failed to fetch school type");
    }
  };

  export const getSchoolYears = async (schoolID) => {
    try {
      // Make a GET request to your backend API to retrieve the school ID
      const response = await instance.get(`/api/v1/school/${schoolID}/getSchoolYears`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching school type:", error);
      throw new Error("Failed to fetch school type");
    }
  };

  export const registerSchoolYears = async (schoolID , schoolYears) => {
    try {
      const response = await instance.post(`/api/v1/school/${schoolID}/schoolYear` , schoolYears);
      return response.data;
    } catch (error) {
      console.error('Error creating classroom:', error);
      throw new Error('Failed to create classroom');
    }
  };

  export const endSchoolYear = async (schoolYearID) => {
    try {
      const response = await instance.put(`/api/v1/school/stopSchoolYear/${schoolYearID}`);
      return response.data;
    } catch (error) {
      console.error('Error creating classroom:', error);
      throw new Error('Failed to create classroom');
    }
  };

  export const startSchoolYear = async (schoolYearID) => {
    try {
      const response = await instance.put(`/api/v1/school/startSchoolYear/${schoolYearID}`);
      return response.data;
    } catch (error) {
      console.error('Error creating classroom:', error);
      throw new Error('Failed to create classroom');
    }
  };

  export const updateSchoolYear = async (schoolYearID, years) => {
    try {
      const response = await instance.put(`/api/v1/school/${schoolYearID}/updateSchoolYear` , years);
      return response.data;
    } catch (error) {
      console.error('Error creating classroom:', error);
      throw new Error('Failed to create classroom');
    }
  }