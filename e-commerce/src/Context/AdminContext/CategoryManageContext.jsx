import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../AuthContext';
const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);


// CategoryProvider Component - Wrap this around your app to provide context
export const CategoryProvider = ({ children }) => {
    const { fetchUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    // Create a new category
    const createCategory = async (category) => {
        try {
            setLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/category`, { category }, { withCredentials: true });
            if (res.status === 201) {
                readCategories();
                toast.success('Category created successfully');
                setLoading(false);
            }
            setLoading(false);

        } catch (error) {
            toast.error(error.response.data.message);

        }
    };

    // Read categories (just return the current state)
    const readCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/category`, { withCredentials: true });
            setCategories(res.data);

            setLoading(false);

        } catch (error) {
            toast.error(error.response.data.message);

        }
    };

    // Update a category by ID
    const updateCategory = async (categoryId, categoryName) => {
        try {
            setLoading(true);
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/admin/category`, { categoryId, categoryName }, { withCredentials: true });
            if (res.status === 200) {
                toast.success(res.data.message);
                readCategories();
            }

            setLoading(false);

        } catch (error) {
            toast.error(error.response.data.message);

        }
    };

    // Delete a category by ID
    const deleteCategory = async (categoryId) => {
        try {
            setLoading(true);
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/category/${categoryId}`, { withCredentials: true });
            if (res.status === 200) {
                toast.success(res.data.message);
                readCategories();
            }

            setLoading(false);

        } catch (error) {
            toast.error(error.response.data.message);

        }
    };

    const adminSettings = async (formData) => {
        try {
            setLoading(true);
            setTimeout(async () => {

                const res = await axios.put(`${process.env.REACT_APP_API_URL}/admin/update-profile`, formData, { withCredentials: true });
                if (res.status === 200) {
                    setLoading(false);
                    fetchUser()
                    toast.success('Admin settings updated successfully');

                }
            }, 1000);
        } catch (error) {

        }
        // Your admin settings update logic goes here...
    }

    useEffect(() => {
        readCategories();
    }, [])
    return (
        <CategoryContext.Provider
            value={{ categories, setCategories, createCategory, adminSettings, readCategories, loading, updateCategory, deleteCategory }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
