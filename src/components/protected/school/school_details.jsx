import React from 'react';
import useSchoolData from '../../../services/school_';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

export default function SchoolInformation() {
  const param = useParams();
  const { school, isLoading } = useSchoolData(param['schoolID']); // Assuming useSchoolData is a custom hook to fetch school data
  isLoading ? console.log("loading") : console.log(school);
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <TailSpin
          visible={true}
          height={30}
          width={30}
          color="rgb(0, 0 ,255)"
          ariaLabel="tail-spin-loading"
          radius={0.5}
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  // Check if School object is undefined or null
  if (!school) {
    return <div>No data available</div>;
  }

  // Data has been fetched, render the component
  return (
    <div className="mt-16 ml-64 flex justify-center">
      <div>
        <div className="bg-blue-200 text-white mb-4 p-3 mt-10">
          Informations générales
        </div>
        <div className="flex gap-40 mb-4">
          <div>
            <p className="text-2xl">{school.name}</p>
            <p>{school.email}</p>
            <p>ID{school.schoolID}</p>
            <p>{school.schoolType}</p>
          </div>
          <div className="flex justify-center">
            <ul>
              <li>{school.address.quarter}</li>
              <li>{school.address.avenue}</li>
              <li>{school.address.houseNumber || 'Not available'}</li>
            </ul>
          </div>
        </div>
        <div className="bg-blue-100 text-white mb-4 p-3">Responsable</div>
        <div className="flex gap-64">
          <p>
            Director <br /> {school.director.name}
          </p>
          <ul>
            <div className="address">
              <li>{school.director.address.quarter}</li>
              <li>{school.director.address.avenue}</li>
              <li>{school.director.address.houseNumber || 'Not available'}</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
