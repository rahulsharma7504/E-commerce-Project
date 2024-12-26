import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom'

// Create context
export const AuthContext = createContext();

// Custom hook to access AuthContext easily
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to fetch user data once after login
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user`, { withCredentials: true });
      setUser(response.data);
      console.log(user.role)
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      axios.post('http://localhost:4000/api/logout', {}, { withCredentials: true });
      setUser(null);
      alert('Logged out successfully');
      navigate('/login');

    } catch (error) {
      console.error("Failed to logout", error);
    }
  }

  // Call fetchUser only once after login
  useEffect(() => {
    fetchUser();
  }, []);

  const value = { user, loading, logout, fetchUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
