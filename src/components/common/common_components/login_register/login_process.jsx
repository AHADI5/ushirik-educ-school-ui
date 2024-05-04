import { getSchoolID } from "../../../../services/school_service";
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner';
import { useAuth } from "../../auth/auth";
import {jwtDecode} from 'jwt-decode';

export default function LoginProcess () {
  const {login} = useAuth ();
  const [formData, setFormData] = useState ({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState (false);
  const [error, setError] = useState ('');
  const navigate = useNavigate ();

  const gatherData = event => {
    const {name, value} = event.target;
    setFormData (prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async event => {
    event.preventDefault ();
    setError ('');
    setLoading (true);

    try {
      await login (formData);
      const token = sessionStorage.getItem ('token');
      if (token) {
        const decodedToken = jwtDecode (token);
        console.log (decodedToken);

        switch (decodedToken.authorities) {
          case 'ADMIN':
            navigate ('/schools');
            break;
          case 'DIRECTOR':
            const schoolID = await getSchoolID ();
            navigate (`/schoolDirection/${schoolID}`);
            break;
          default:
            throw new Error ('Unauthorized role');
        }
      } else {
        throw new Error ('No token found');
      }
    } catch (loginError) {
      console.error (loginError);
      setError ('Email ou mot de passe incorrect.');
    } finally {
      setLoading (false);
    }
  };

  return (
    <div className="login-section flex items-center justify-center h-full mt-20">
      <form onSubmit={handleLogin} method="post" className="bg-white  rounded pt-6 pb-8 mb-4">
        <h2 className="form-title mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
          Connectez-vous
        </h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700  pl-2 py-3 rounded relative mb-4" role="alert">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            E-Mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="gloire@gmail.com"
            onChange={gatherData}
            value={formData.email}
            className="w-full  pl-2 py-1.5 rounded-lg border focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Mot de passe"
            onChange={gatherData}
            value={formData.password}
            required
            className="w-full  pl-2 py-1.5 rounded-lg border focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  pl-2 rounded focus:outline-none focus:shadow-outline w-80" disabled={loading}>
            {loading
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
