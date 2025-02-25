import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useProduct } from './Management/ProductsManageContext';
import { useUsers } from './Management/UserManageContext';
import { useVendor } from './Management/VendorManageContext';
const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);


// CategoryProvider Component - Wrap this around your app to provide context
export const CategoryProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    // Create a new category
    const createCategory = async (category) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }


            setLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/category`, { category }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            if (res.status === 201) {
                await readCategories();
                toast.success('Category created successfully');
            }
            setLoading(false);

        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            setLoading(false);

        }
    };

    // Read categories (just return the current state)
    const readCategories = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/category`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            setCategories(res.data);

            setLoading(false);

        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            setLoading(false);

        }
    };

    // Update a category by ID
    const updateCategory = async (categoryId, categoryName) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }
            setLoading(true);
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/admin/category`, { categoryId, categoryName }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                await readCategories();
            }

            setLoading(false);

        } catch (error) {
            toast.error(error.response.data.message);

        }
    };

    // Delete a category by ID
    const deleteCategory = async (categoryId) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }
            setLoading(true);
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true 
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                await readCategories();
            }

            setLoading(false);

        } catch (error) {
            toast.error(error.response.data.message);

        }
    };

    const adminSettings = async (formData) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }
            setLoading(true);

                const res = await axios.put(`${process.env.REACT_APP_API_URL}/admin/update-profile`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.status === 200) {
                    setLoading(false);
                    window.location.reload();
                    toast.success('Admin settings updated successfully');

                } else {
                    setLoading(false);
                    toast.error('Failed to update admin settings');
                }
        } catch (error) {

            setLoading(false);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
        // Your admin settings update logic goes here...
    }

    // useEffect(() => {
    //     readCategories();
    // }, [])
    return (
        <CategoryContext.Provider
            value={{ categories, setCategories, createCategory, adminSettings, readCategories, loading, updateCategory, deleteCategory }}
        >
            {children}
        </CategoryContext.Provider>
    );
};





