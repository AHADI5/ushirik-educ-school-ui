import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import SchoolForm from './school_form';
import DirectorForm from './director_form';

export default function RegisterSchoolForm() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  // State for school data
  const [schoolData, setSchoolData] = useState({
    name: '',
    email: '',
    postalBox: '',
    adminEmail: '', // Populate this from token
  });

  // State for school address
  const [schoolAddress, setSchoolAddress] = useState({
    schoolQuarter: '',
    schoolAvenue: '',
  });

  // State for director data
  const [directorData, setDirectorData] = useState({
    firstName: '',
    lastName: '',
    directorEmail: '',
  });

  // State for director address
  const [directorAddress, setDirectorAddress] = useState({
    quarter: '',
    avenue: '',
  });

  // Function to handle changes in school form
  const handleSchoolChange = (event) => {
    // Update school form data state
    const { name, value } = event.target;
    setSchoolData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle changes in director form
  const handleDirectorChange = (event) => {
    // Update director form data state
    const { name, value } = event.target;
    setDirectorData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle next step
  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      handleSubmit();
    }
  };

  // Function to handle previous step
  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      // Your form submission logic here
      // Example: navigate('/success');
    } catch (error) {
      setError('Les informations sont incorrectes.');
    }

    setLoading(false);
  };

  return (
    <div className="login-section school-infos flex items-center justify-center">
      <form className="">
        <h2 className="form-title mt-10 mb-10  text-1xl font-bold leading-9 tracking-tight text-center">
        {step === 1 ?  `Enregistrer une Ecole` : `Enregistrer un Directeur`}   
        </h2>
        <p className="text-left text-1xl text-red-500">{error}</p>
        {step === 1 && (
          <SchoolForm
            schoolData={schoolData}
            schoolAddress={schoolAddress}
            onSchoolChange={handleSchoolChange}
          />
        )}
        {step === 2 && (
          <DirectorForm
            directorData={directorData}
            directorAddress={directorAddress}
            onDirectorChange={handleDirectorChange}
          />
        )}
        <div className="send-button">
          <div className="flex justify-between gap-5">
            {step === 2 && (
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1.5   px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handlePrevStep}
              >
                Précédent
              </button>
            )}
            <button
              className="send-button-icon flex justify-center items-center  bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5  px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleNextStep}
            >
              <div className="text-center flex justify-center">
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <TailSpin
                      visible={true}
                      height="30"
                      width="30"
                      color="rgb(255,255 ,255)"
                      ariaLabel="tail-spin-loading"
                      radius="0.5"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  <p className="text-center">Suivant</p>
                )}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
