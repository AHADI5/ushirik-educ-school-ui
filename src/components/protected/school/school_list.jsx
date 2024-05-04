import React, {useState, useEffect} from 'react';
import instance from '../../../services/axios';
import Avatar from 'react-avatar';
import {LineWave} from 'react-loader-spinner';
import {Link, useNavigate} from 'react-router-dom';
import AddButton from '../../common/utilities/large_button';

export default function Schools () {
  const [schools, setSchools] = useState ([]);
  const [isLoading, setIsLoading] = useState (false);

  useEffect (() => {
    const fetchSchools = async () => {
      setIsLoading (true);
      try {
        const response = await instance.get ('/api/v1/school/admin/schools');
        setSchools (response.data);
      } catch (error) {
        // setError("Failed to fetch schools.");
        console.log ('error');
      }
      setIsLoading (false);
    };

    fetchSchools ();
  }, []);

  //Navigating user to new school registration form
  const navigate = useNavigate ();

  function navigateToNewSchool () {
    navigate ('/register-school');
  }

  return (
    <div className="login-section schools flex">
      <div className="schools-list">
        <h2 className="form-title mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Connectez-vous
          {console.log ('bla bla bla welcome')}
        </h2>
        <p className="title">
          Vous pouvez administrer plusieurs écoles avec partir d'une seule adresse mail
        </p>
        {/* {error && <p className="error">{error}</p>} */}
        {isLoading
          ? <div className="flex items-center justify-center">
              <LineWave
                visible={true}
                height={100}
                width={100}
                color="rgb(68, 137, 217)"
                ariaLabel="line-wave-loading"
                wrapperStyle={{}}
                wrapperClass=""
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""
              />
            </div>
          : <div className="overflow-y-auto max-h-60">
              <div className="schools">
                {schools.length === 0
                  ? <div className="empty-message">
                      <p>Aucune école disponible pour l'instant.</p>

                    </div>
                  : schools.map (school => (
                      <Link to={`/schoolAdmin/${school.schoolID}`}>

                        <div
                          className="schools-administrated flex"
                          key={school.schoolID}
                        >
                          <div className="school flex">
                            <div className="letter-image flex">
                              <p>
                                <Avatar
                                  name={school.name}
                                  round={true}
                                  size="50"
                                />
                              </p>
                            </div>
                            <div className="school-general-info">
                              <div className="name">{school.name}</div>
                              <div className="students-teachers flex">
                                <div className="students flex">
                                  <div className="number">
                                    {school.students}
                                  </div>
                                  <div className="text">ÉLÈVES</div>
                                </div>
                                <div className="dot-separation flex">•</div>
                                <div className="classroom flex">
                                  <div className="number">{school.classes}</div>
                                  <div className="text">CLASSES</div>
                                </div>
                                <div className="dot-separation flex">•</div>
                                <div className="classroom flex">
                                  <div className="number">
                                    {school.teachers}
                                  </div>
                                  <div className="text">ENSEIGNANTS</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="status">{school.status}</div>
                        </div>
                      </Link>
                    ))}
              </div>

            </div>}
        <div
          className="action flex justify-end w-16"
          onClick={navigateToNewSchool}
        >
          <AddButton text = {"Ajouter une école"}/>
        </div>
      </div>
    </div>
  );
}
