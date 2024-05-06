import { createContext , useContext , useState , useEffect } from 'react';
import instance from '../../../services/axios';
import { jwtDecode } from 'jwt-decode';


/**
 * 
 * this component is a authentification Provider , it will 
 * help us to authentificate a user any where in the application 
 * 
 * 
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(() => {
    const token = sessionStorage.getItem('token');
    // Ensure that the token is a string and not just any truthy value
    return typeof token === 'string' && token.trim() !== '';
  });
  const [userRole, setUserRole] = useState(() => {
    const token = sessionStorage.getItem('token');
    // Decode the token only if it's a non-empty string
    return token ? jwtDecode(token).authorities : null;
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (typeof token === 'string' && token.trim() !== '') {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.authorities);
    } else {
      setUserRole(null);
    }
  }, []);

  const login = async (formData) => {
    try {
      const response = await instance.post('/api/v1/auth/authenticate', formData);
      if (response.data.token && typeof response.data.token === 'string') {
        setAuthed(true);
        sessionStorage.setItem('token', response.data.token);
        // Decode the token to extract user role
        const decodedToken = jwtDecode(response.data.token);
        setUserRole(decodedToken.authorities);
      } else {
        // Handle the case where the token is not a string or is missing
        console.error('Token must be a string value');
        throw new Error('Login failed: Token must be a string value');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('token');
      setAuthed(false);
      setUserRole(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ authed, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
