import { useState, useEffect } from "react";
import instance from "./axios";


const useUserData = (schoolID) => {

  // Set top user state variable to an empty array
  const [topUsers, setTopUsers] = useState([]);
  // Set all users state variable to an empty array
  const [allUsers, setAllUsers] = useState([]);
  // Set users added today state variable to an empty array
  const [usersAddedToday, setUsersAddedToday] = useState([]);

  //set an empty array for storing numbers (user per role quantity)
  const [userStat, setUserStat] = useState([]);
  // Set isLoading state for loaders and spinners
  
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch top five recent users
      const topUsersResponse = await instance.get(`/api/v1/auth/${schoolID}/recent-users`);
      setTopUsers(topUsersResponse.data);

      // Fetch all users
      const allUsersResponse = await instance.get(`/api/v1/auth/${schoolID}/users`);
      setAllUsers(allUsersResponse.data);
      console.log("All users number  " , allUsersResponse)

      // Fetch users added today
      const usersAddedTodayResponse = await instance.get(`/api/v1/auth/${schoolID}/user-created-today`);
      setUsersAddedToday(usersAddedTodayResponse.data);

      const userStats = await instance.get(`/api/v1/auth/${schoolID}/getUsersStats`);
      setUserStat(userStats.data)

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [schoolID]); // Watch for changes in schoolID

  const createUser = async (newUserData) => {
    try {
      // Send a POST request to create a new user
      const response = await instance.post(`/api/v1/teacher/new-teacher`, newUserData);
      if (response.status === 200) {
        console.log('User created successfully');
        // Refresh data after creating user
        fetchData();
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const modifyUser = async (userID, newData) => {
    try {
      // Send a PUT request to modify an existing user
      const response = await instance.put(`/api/v1/auth/edit-user/${userID}`, newData);
      if (response.status === 200) {
        console.log('User modified successfully');
        // Refresh data after modifying user
        // fetchData();
      } else {
        console.error('Failed to modify user');
      }
    } catch (error) {
      console.error('Error modifying user:', error);
    }
  };

  return { topUsers, allUsers, usersAddedToday, isLoading,userStat, createUser, modifyUser };
};

export default useUserData;
