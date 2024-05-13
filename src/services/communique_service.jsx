import instance from './axios';
const BASE_URL = 'api/v1/school';

const CommuniqueService = {
  // Fetch all Communiques 
  getCommuniques: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/communications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Communiques:', error);
      throw new Error('Failed to fetch Communiques');
    }
  },

   // Fetch all Communiques 
   getCommuniques: async (schoolID) => {
    try {
      const response = await instance.get(`${BASE_URL}/${schoolID}/Communiques`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Communiques:', error);
      throw new Error('Failed to fetch Communiques');
    }
  },

  // Create a new Communique option
  modifyCommuniqueOption: async (schoolID, CommuniqueData) => {
    try {
      const response = await instance.put(`${BASE_URL}/${schoolID}/new-CommuniqueOption`, CommuniqueData);
      return response.data;
    } catch (error) {
      console.error('Error creating Communique:', error);
      throw new Error('Failed to create Communique');
    }
  },


  //Create new Communique 
  publishCommunique: async (schoolID, CommuniqueData) => {
    try {
      const response = await instance.post(`${BASE_URL}/${schoolID}/registerCommunique`, CommuniqueData);
      return response.data;
    } catch (error) {
      console.error('Error creating Communique:', error);
      throw new Error('Failed to create Communique');
    }
  },

  // Update an existing Communique
  // updateCommunique: async (schoolID, CommuniqueId, updatedCommuniqueData) => {
  //   try {
  //     const response = await instance.put(`${BASE_URL}/${schoolID}/${CommuniqueId}`, updatedCommuniqueData);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error updating Communique:', error);
  //     throw new Error('Failed to update Communique');
  //   }
  // },

  // Delete a Communique
  // deleteCommunique: async (schoolID, CommuniqueId) => {
  //   try {
  //     await instance.delete(`${BASE_URL}/${schoolID}/${CommuniqueId}`);
  //   } catch (error) {
  //     console.error('Error deleting Communique:', error);
  //     throw new Error('Failed to delete Communique');
  //   }
  // },
};

export default CommuniqueService;
