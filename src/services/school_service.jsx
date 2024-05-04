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
  