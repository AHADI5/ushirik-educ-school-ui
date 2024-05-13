import React from 'react';
import instance from '../../../../services/axios';
import {TailSpin} from 'react-loader-spinner';

//register admin endpoint
const REGISTER_ENDPOINT = '/api/v1/school/schoolAdmin';

export default function SignUpForm () {
  const [formData, setFormData] = React.useState ({
    firstName: '',
    lastName: '',
    email: '',
    password: '12345',
  });

  //Loading initialization
  //State variable for loading
  const [isLoading, setIsLoading] = React.useState (false);

  function gatherData (event) {
    const {name, value} = event.target; // Destructure value from event.target

    setFormData (prevFormData => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  // Create Account
  const createAccount = async e => {
    console.log(formData)
    e.preventDefault ();
    setIsLoading (true);

    //sending information to the backend

    try {
      const response = await instance.post(REGISTER_ENDPOINT, formData);
      console.log (response);
      const token = response.data['token'];
      //Saving the token on the local storage
      localStorage.setItem ('token', token);

      //Set is loading to false
      setIsLoading (false);

      //this code below decodes the token

      window.location.href = '/schools';
    } catch (error) {
      console.log ('registration failed');
    } finally {
      setIsLoading (false);
    }
  };

  return (
    <div className="login-section login-section- ">
      <form action="" method="post" onSubmit={createAccount}>
        <h2 className="form-title mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Créer Un compte
        </h2>
        <div className="firstName">
          <div className=" mb-2"><label className=" mb-2">Nom</label></div>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Ahadi"
            onChange={gatherData}
            value={formData.firstName}
            className="w-full  pl-2 py-1.5 mb-5 rounded-lg border focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="lastName">
          <div className=" mb-2"><label className=" mb-2">Prenom</label></div>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Gloire"
            onChange={gatherData}
            value={formData.lastName}
            className="w-full  pl-2 py-1.5 mb-5 rounded-lg border focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="email">
          <div className=" mb-2"><label >E-Mail</label></div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="gloire@gmail.com"
            onChange={gatherData}
            value={formData.email}
            className="w-full  pl-2 py-1.5 mb-5 rounded-lg border focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="passoword">
          <div className=" mb-2"> <label >Mot de passe</label></div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Mot de passe"
            required
            className="w-full  pl-2 py-1.5 mb-5 rounded-lg border focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  pl-2 rounded focus:outline-none focus:shadow-outline w-80"
            disabled={isLoading}
          >
            {isLoading
              ? <div className="flex items-center justify-center">
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
              : 'Connexion'}
          </button>
        </div>
      </form>
    </div>
  );
}
