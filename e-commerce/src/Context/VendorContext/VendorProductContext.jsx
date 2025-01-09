// ProductManageContext.js
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCategory } from "../AdminContext/CategoryManageContext";


// Create the context
const ProductManageContext = createContext();

// Provider component
export const VendorProductProvider = ({ children }) => {
    const {readCategories}=useCategory()
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    var vendorId = JSON.parse(localStorage.getItem('user'))?._id;

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
                        'Content-Type': 'multipart/form-data', // Correct Content-Type for file uploads
                    },
                }
            );

            if (res.status === 201) {
                toast.success(res.data.message);
                getVendorProducts();
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };





    // Read Products (Get all products)
    const getVendorProducts = async () => {
        try {
            setLoading(true);
            // Replace with your API call or data fetching logic
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendor/product/${vendorId}`, { withCredentials: true });
            if (response.status === 200) {
                setProducts(response.data)
                setLoading(false);  
            }
        }
        catch (err) {
            toast.error(err.response.data.message);
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
                        'Content-Type': 'multipart/form-data', // Correct Content-Type for file uploads
                    },
                }
            );

            if (res.status === 200) {
                toast.success(res.data.message);
                getVendorProducts();
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    // Function to delete a product
    const deleteProduct = async (productID) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/vendor/product/${productID}`, { withCredentials: true });
            if (response.status === 200) {
                toast.success(response.data.message);
                getVendorProducts();
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }
    };


    useEffect(async() => {

        if (localStorage.getItem('user')) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser.role === 'vendor') {
               await readCategories();
               await getVendorProducts();

            }
          }
    }, [])
    return (
        <ProductManageContext.Provider
            value={{ products, setProducts,getVendorProducts, addProduct, loading, editProduct, deleteProduct }}>
            {children}
        </ProductManageContext.Provider>
    );
};

// Hook to use the context
export const useVendorProduct = () => useContext(ProductManageContext);



