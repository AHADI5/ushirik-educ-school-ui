import { useState, useEffect } from "react";
import instance from "./axios";

const useSchoolData = (schoolID) => {
  // Set top user state variable to an empty array
  const [School, setSchool] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    //   setIsLoading(true);
      try {
        // Fetch top five recent users
        const SchoolResponse = await instance.get(`/api/v1/school/${schoolID}`);
        setSchool(SchoolResponse.data);
        // setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Watch for changes in schoolID.schoolID

//   const setUser = async (userID , newData) => {
//     instance.put(`/api/v1/auth/edit-user/${userID}` , newData )

//   }

  return { School};
};

export default useSchoolData;
