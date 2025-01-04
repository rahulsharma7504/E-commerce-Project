import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'; // For toast notifications

// Create VendorContext
export const VendorContext = createContext();

// Custom hook to access VendorContext
export const useVendor = () => useContext(VendorContext);

// VendorProvider component that wraps your app and provides the context value
export const VendorProvider = ({ children }) => {
    const [vendors, setVendors] = useState([]); // Store vendors
    const [loading, setLoading] = useState(false); // Loading state for API calls
    const apiUrl = process.env.REACT_APP_API_URL; // Base API URL

    // Fetch all vendors
    const fetchVendors = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/admin/all-vendors`, { withCredentials: true });
            setVendors(response.data); // Set the vendors in the state
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Create a new vendor
    const createVendor = async (vendorData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/admin/create-vendor`, { vendorData }, { withCredentials: true });
            if (response.status === 201) {
                toast.success(response.data.message);
                fetchVendors(); // Fetch updated vendors list
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Update a vendor's details
    const updateVendor = async (userId, updatedData) => {
        setLoading(true);
        try {
            const response = await axios.put(`${apiUrl}/admin/update-vendor`, { userId, updatedData }, { withCredentials: true });
            if (response.status === 200) {
                toast.success(response.data.message); 
                fetchVendors(); // Fetch updated vendors list
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Delete a vendor
    const deleteVendor = async (userId) => {
        setLoading(true);
        try {
           const res= await axios.delete(`${apiUrl}/admin/delete-vendor/${userId}`,{withCredentials: true});
            if(res.status === 200) {
                toast.success(res.data.message);
                fetchVendors(); // Fetch updated vendors list
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchVendors(); // Fetch initial vendors list when the component mounts
    }, [])

    // Context value that will be provided to the components
    const value = {
        vendors,
        loading,
        fetchVendors,
        createVendor,
        updateVendor,
        deleteVendor,
    };

    return <VendorContext.Provider value={value}>{children}</VendorContext.Provider>;
};
