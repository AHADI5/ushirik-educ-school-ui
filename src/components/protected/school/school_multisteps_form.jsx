import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import SchoolForm from './school_form';
import DirectorForm from './director_form';
import instance from '../../../services/axios'; // Make sure to import axios instance from the correct location
import { useAuth } from '../../common/auth/auth';

export default function RegisterSchoolForm() {
  
  const {userEmail}  = useAuth()
  console.log("admin email is :",userEmail)
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const [schoolData, setSchoolData] = useState({
    name: '',
    email: '',
    postalBox: '',
    adminEmail: userEmail,
    type: ''  
  });

  const [schoolAddress, setSchoolAddress] = useState({
    schoolQuarter: '',
    schoolAvenue: '',
  });

  const [directorData, setDirectorData] = useState({
    firstName: '',
    lastName: '',
    directorEmail: '',
    directorPhone: ''
  });

  const [directorAddress, setDirectorAddress] = useState({
    quarter: '',
    avenue: '',
  });

  const handleSchoolAddress = (event) => {
    const { name, value } = event.target;
    setSchoolAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDirectorAddress = (event) => {
    const { name, value } = event.target;
    setDirectorAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSchoolChange = (event) => {
    const { name, value } = event.target;
    setSchoolData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDirectorChange = (event) => {
    const { name, value } = event.target;
    setDirectorData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const gatherData = () => {
    const formData = {
      schoolData: {
        ...schoolData,
        address: { ...schoolAddress }
      },
      directorData: {
        ...directorData,
        address: { ...directorAddress }
      }
    };
    return formData;
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
  
    try {
      const formData = {
        name: schoolData.name,
        email: schoolData.email,
        postalBox: schoolData.postalBox,
        adminEmail: schoolData.adminEmail,
        schoolType: schoolData.type,
        address: { ...schoolAddress },
        director: {
          firstName: directorData.firstName,
          lastName: directorData.lastName,
          directorEmail: directorData.directorEmail,
          address: { ...directorAddress }
        }
      };
  
      const response = await instance.post("/api/v1/school/register-school", formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      console.log(formData);
      navigate("/schools");
    } catch (error) {
      setError('Les informations sont incorrectes.');
    }
  
    setLoading(false);
  };
  

  return (
    <div className="login-section school-infos flex items-center justify-center">
      <form className="" onSubmit={handleSubmit}>
        <h2 className="form-title mt-10 mb-10 text-1xl font-bold leading-9 tracking-tight text-center">
          {step === 1 ? `Enregistrer une Ecole` : `Enregistrer un Directeur`}   
        </h2>
        <p className="text-left text-1xl text-red-500">{error}</p>
        {step === 1 && (
          <SchoolForm
            schoolData={schoolData}
            schoolAddress={schoolAddress}
            onSchoolAddressChange={handleSchoolAddress}
            onSchoolChange={handleSchoolChange}
          />
        )}
        {step === 2 && (
          <DirectorForm
            directorData={directorData}
            directorAddress={directorAddress}
            onDirAddressChange={handleDirectorAddress}
            onDirectorChange={handleDirectorChange}
          />
        )}
        <div className="send-button">
          <div className="flex justify-between gap-5">
            {step === 2 && (
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handlePrevStep}
              >
                Précédent
              </button>
            )}
            <button
              type="button"
              onClick={handleNextStep}
              className="send-button-icon flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline"
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
                  <p className="text-center">{step === 1 ? 'Suivant' : 'Soumettre'}</p> 
                )}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
