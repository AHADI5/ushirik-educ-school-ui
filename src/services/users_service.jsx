import { useState, useEffect } from "react";
import instance from "./axios";

const useUserData = (schoolID) => {
  // Set top user state variable to an empty array
  const [topUsers, setTopUsers] = useState([]);

  // Set all users state variable to an empty array
  const [allUsers, setAllUsers] = useState([]);

  // Set users added today state variable to an empty array
  const [usersAddedToday, setUsersAddedToday] = useState([]);

  // Set isLoading state for loaders and spinners
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch top five recent users
        const topUsersResponse = await instance.get(`/api/v1/auth/${schoolID}/recent-users`);
        setTopUsers(topUsersResponse.data);

        // Fetch all users
        const allUsersResponse = await instance.get(`/api/v1/auth/${schoolID}/users`);
        setAllUsers(allUsersResponse.data);

        // Fetch users added today
        const usersAddedTodayResponse = await instance.get(`/api/v1/auth/${schoolID}/user-created-today`);
        setUsersAddedToday(usersAddedTodayResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Watch for changes in schoolID.schoolID

  const setUser = async (userID , newData) => {
    instance.put(`/api/v1/auth/edit-user/${userID}` , newData )

  }

  return { topUsers, allUsers, usersAddedToday, isLoading };
};

export default useUserData;
