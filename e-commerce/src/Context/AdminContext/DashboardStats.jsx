import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

// Create the context
const dashBoardContext = createContext();

// Create a provider component
export const AdminDashBoardProvider = ({ children }) => {
  
    const [adminStats, setAdminStats]=useState(null);
    const [loading, setLoading]=useState(false);
    // Function to fetch admin dashboard stats
    const fetchAdminStats = async () => {
        setLoading(true);
        try {
          const token = sessionStorage.getItem('token');
          if (!token) {
              return;
          }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/dashboard-stats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAdminStats(response.data);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        setLoading(false);
    };


  return (
    <dashBoardContext.Provider value={{fetchAdminStats,adminStats, loading}}>
      {children}
    </dashBoardContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAdminDashBoard = () => {
  return useContext(dashBoardContext);
};
