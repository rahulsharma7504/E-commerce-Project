import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Replace with your API call or data fetching logic
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/all-users`, { withCredentials: true });

            setUsers(response.data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a user
    const deleteUser = async (userId) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/delete-user`, { userId }, { withCredentials: true });
            if(res.status === 200) {
                toast.success(res.data.message);
                fetchUsers();
            }
        
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Function to change user status
    const changeUserStatus = async (userId, status) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/admin/update-user-status`, { userId, status }, { withCredentials: true });
            if (res.status === 200) {
                toast.success(res.data.message);

                fetchUsers();
            }
        } catch (err) {
            toast(err.message, { type: 'error' });
        }
    };

    // UseEffect to fetch users when the component mounts
    

    return (
        <UserContext.Provider value={{ users, fetchUsers, setUsers, loading, deleteUser, changeUserStatus }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUsers = () => useContext(UserContext);
