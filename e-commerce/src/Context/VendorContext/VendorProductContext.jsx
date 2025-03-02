// ProductManageContext.js
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCategory } from "../AdminContext/CategoryManageContext";


// Create the context
const ProductManageContext = createContext();

// Provider component
export const VendorProductProvider = ({ children }) => {
    const { readCategories } = useCategory()
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allOrders, setAllOrders] = useState(null);
    const [allSales, setAllSales] = useState(null);
    const [products, setProducts] = useState([]);

    const vendorId = JSON.parse(localStorage.getItem('user'))?._id;

    // Function to add a new product
    const addProduct = async (product) => {
        try {
            setLoading(true);
            // Create a FormData object
            const formData = new FormData();

            // Append all the properties of the product object to FormData
            for (const key in product) {
                if (key === 'images') {
                    for (let i = 0; i < product.images.length; i++) {
                        formData.append("images", product.images[i]);
                    }
                } else {
                    // Append other fields as normal
                    formData.append(key, product[key]);
                }
            }

            // Send the FormData object with Axios
            const res = await axios.post(

                `${process.env.REACT_APP_API_URL}/vendor/create-product/${vendorId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data', // Correct Content-Type for file uploads
                    },
                }
            );

            if (res.status === 201) {
                toast.success(res.data.message);
                await getVendorProducts();
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            setLoading(false);
        }
    };





    // Read Products (Get all products)
    const getVendorProducts = async (vendorId) => {
        try {
            setLoading(true);
            // Replace with your API call or data fetching logic
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendor/product/${vendorId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                }
            });
            if (response.status === 200) {
                setProducts(response.data)
                setLoading(false);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
            setLoading(false);
        }
    };


    // Function to edit an existing product
    const editProduct = async (updatedProduct) => {
        try {
            setLoading(true);
            var vendorId = JSON.parse(localStorage.getItem('user'))._id;

            // Create a FormData object
            const formData = new FormData();

            // Append all the properties of the product object to FormData
            for (const key in updatedProduct) {
                if (key === 'images') {
                    for (let i = 0; i < updatedProduct.images.length; i++) {
                        formData.append("images", updatedProduct.images[i]);
                    }
                } else {
                    // Append other fields as normal
                    formData.append(key, updatedProduct[key]);
                }
            }

            // Send the FormData object with Axios
            const res = await axios.put(

                `${process.env.REACT_APP_API_URL}/vendor/product/${vendorId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data', // Correct Content-Type for file uploads
                    },
                }
            );

            if (res.status === 200) {
                toast.success(res.data.message);
                await getVendorProducts();
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    // Function to delete a product
    const deleteProduct = async (productID) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/vendor/product/${productID}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                await getVendorProducts();
            }

        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    const vendorAnalytics = async (vendorId) => {
        try {
            setLoading(true);
            // Correct way to pass vendorId as query parameter
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/vendor/analytics`, {
                params: { vendorId }, // vendorId ko query parameter ke roop mein bheje
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },

            });
            if (res.status === 200) {
                setAnalyticsData(res.data);
            }
        } catch (error) {
            console.error(error); // Detailed log
            if (error.response) {
                toast.error(error.response?.data?.message || "API call failed");
            } else {
                toast.error("Network error or no response from server");
            }
        } finally {
            setLoading(false);
        }
    }


    // Api For Vednor Al Orders

    const vendorAllOrders = async (vendorId) => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/vendor/all-orders`, {
                params: { vendorId }, // vendorId ko query parameter ke roop mein bheje
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            if (res.status === 200) {
                setAllOrders(res.data.data);
            }
        } catch (error) {
            console.error(error); // Detailed log
            if (error.response) {
                toast.error(error.response?.data?.message || "API call failed");
            } else {
                toast.error("Network error or no response from server");
            }
        } finally {
            setLoading(false);
        }
    }


    const vendorAllSales = async (vendorId) => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/vendor/all-sales`, {
                params: { vendorId }, // vendorId ko query parameter ke roop mein bheje
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            if (res.status === 200) {
                setAllSales(res.data);
            }
        } catch (error) {
            console.error(error); // Detailed log
            if (error.response) {
                toast.error(error.response?.data?.message || "API call failed");
            } else {
                toast.error("Network error or no response from server");
            }
        } finally {
            setLoading(false);
        }
    }



    const VendorData = async () => {
        if (localStorage.getItem('user')) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser.role === 'vendor') {
                try {
                    await Promise.all([
                        readCategories(storedUser._id),
                        getVendorProducts(storedUser._id),
                        vendorAnalytics(storedUser._id),
                        vendorAllOrders(storedUser._id),
                        vendorAllSales(storedUser._id)
                    ]);
                    console.log("All vendor data fetched successfully");
                } catch (error) {
                    console.error("Error fetching vendor data:", error);
                }
            }
        }
    };

    useEffect(() => {
        VendorData();
    }, []);

    return (
        <ProductManageContext.Provider
            value={{ products, setProducts, allSales, vendorAllSales, getVendorProducts, vendorAllOrders, allOrders, vendorAnalytics, analyticsData, addProduct, loading, editProduct, deleteProduct }}>
            {children}
        </ProductManageContext.Provider>
    );
};

// Hook to use the context
export const useVendorProduct = () => useContext(ProductManageContext);



