// services/EventService.js
import instance from "./axios";

const BASE_URL = 'api/v1/school';

const EventService = {
  getAllEvent: async (schoolID) => {
    try {
      const response = await instance.get(`/${BASE_URL}/${schoolID}/events`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all EventS:', error);
      throw error;
    }
  },

  getEventByDate: async (schoolID , dateString) => {
    try {
        const data = { date : dateString }
        console.log("data sent is" , data)
      const response = await instance.post(`${BASE_URL}/${schoolID}/getListEventByStartingDate`, data);
      console.log(response.data)
      return response.data;
      
    } catch (error) {
      console.error(`Error fetching communique with ID :`, error);
      throw error;
    }
  },

  createCommunique: async (communiqueData , schoolID) => {
    try {
      const response = await instance.post(`${BASE_URL}/${schoolID}/newCommunique/`, communiqueData);
      return response.data;
    } catch (error) {
      console.error('Error creating communique:', error);
      throw error;
    }
  },

  updateCommunique: async ( communiqueData , communiqueID) => {
    try {
      const response = await instance.put(`${BASE_URL}/${communiqueID}/update-communique` , communiqueData);
      return response.data;
    } catch (error) {
      console.error(`Error updating communique with ID ${communiqueID}:`, error);
      throw error;
    }
  },

  deleteCommunique: async (communiqueID) => {
    try {
      const response = await instance.delete(`${BASE_URL}/${communiqueID}/delete-communique`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting communique with ID ${communiqueID}:`, error);
      throw error;
    }
  }
};

export default EventService;
