import { useState, useEffect } from "react";
import instance from "./axios";

const useSchoolData = (schoolID) => {
  // Set state variables
  const [school, setSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch school details
        const schoolResponse = await instance.get(`/api/v1/school/${schoolID}`);
        const schoolData = schoolResponse.data;

        // Fetch other related data
        // For example:
        // const teachersResponse = await instance.get(`/api/v1/school/${schoolID}/teachers`);
        // const studentsResponse = await instance.get(`/api/v1/school/${schoolID}/students`);

        // Update state with fetched data
        setSchool(schoolData);

        // Handle other fetched data as needed

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [schoolID]); // Watch for changes in schoolID to trigger a new fetch

  return { school, isLoading, error };
};

export default useSchoolData;
