import instance from "./axios";

const fetchData = async (endpoint) => {
    try {
      const response = await instance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export const users = async (schoolID) => {
    const endpoint = `/api/v1/auth/${schoolID}/users`;
    return await fetchData(endpoint);
  };
  

  
  export const recentUsers = async (schoolID) => {
    const endpoint = `/api/v1/auth/${schoolID}/recent-users`;
    return await fetchData(endpoint);
  };
  
  export const recentUsersNumber = async (schoolID) => {
    const endpoint = `/api/v1/auth/${schoolID}/recent-users`;
    const data = await fetchData(endpoint);
    return data.length;
  };
  
  export const addedToday = async (schoolID) => {
    const endpoint = `/api/v1/auth/${schoolID}/user-created-today`;
    return await fetchData(endpoint);
  };


  