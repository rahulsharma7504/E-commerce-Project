import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading'
import toast from 'react-hot-toast';
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

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user`, { withCredentials: true });
      // Check if user is authenticated
      {
        loading && <Loading/>
      }
      
      setUser(response.data);

      // Navigate based on role
      switch (response.data.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'vendor':
          navigate('/vendor');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const res = await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
      setUser(null);
      if(res.status === 200) {
      toast.success('Logged out successfully'); // For debug or integrate toast
      // Replace alert with a toast notification for better UX
      navigate('/login');
      }
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  // Call fetchUser only once after component mounts
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        await fetchUser();
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      abortController.abort(); // Cleanup to avoid memory leaks
    };
  }, [apiUrl]);

  // Loading state management
  if (loading) {
    return <div>Loading...</div>; // Replace with spinner or skeleton loader
  }

  const value = { user, loading, logout, fetchUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
