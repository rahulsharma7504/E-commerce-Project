import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUsers } from './UserManageContext';
import { useVendor } from './VendorManageContext';
import { useCategory } from '../CategoryManageContext';
// Create the Product Context
const ProductContext = createContext();

// Custom hook to use the Product context
export const useProduct = () => {
  return useContext(ProductContext);
};

// ProductProvider component to provide product data and functions to the app
export const ProductProvider = ({ children }) => {
  const { readCategories } = useCategory();
  
  const { fetchVendors } = useVendor();
  const { fetchUsers } = useUsers();
  const [products, setProducts] = useState([]);

  // Create Product (Add new product)
  const createProduct = async (product) => {
    try {
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
        `${process.env.REACT_APP_API_URL}/admin/create-product`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', // Correct Content-Type for file uploads
          },
        }
      );

      if (res.status === 201) {
        getProducts();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };


  // Read Products (Get all products)
  const getProducts = async () => {
    try {
      // Replace with your API call or data fetching logic
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/product`, { withCredentials: true });

      setProducts(response.data);

    } catch (err) {
      toast.error(err.response.data.message);
    }
  };


  // Delete Product
  const deleteProduct = async (productId) => {
    try {
      // Replace with your API call or data fetching logic
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/product/${productId}`, { withCredentials: true });
      if (response.status === 200) {
        toast.success(response.data.message);
        getProducts();

      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(async () => {
    if (localStorage.getItem('user')) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser.role === 'admin') {
        await getProducts();
        await fetchUsers();
        await fetchVendors();
        await readCategories();
      }
    }

  }, []); // Dependency array to re-run the effect when deleteProduct changes

  return (
    <ProductContext.Provider value={{ products, fetchUsers, readCategories, fetchVendors, setProducts, createProduct, getProducts, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
