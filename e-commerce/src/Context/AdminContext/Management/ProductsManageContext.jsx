import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create the Product Context
const ProductContext = createContext();

// Custom hook to use the Product context
export const useProduct = () => {
  return useContext(ProductContext);
};

// ProductProvider component to provide product data and functions to the app
export const ProductProvider = ({ children }) => {
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
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };


  // Read Products (Get all products)
  const getProducts = async() => {
    try {
      // Replace with your API call or data fetching logic
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/product`, { withCredentials: true });

      setProducts(response.data);

    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // Update Product
  const updateProduct = (id, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  // Delete Product
  const deleteProduct = async(productId) => {
    try {
      // Replace with your API call or data fetching logic
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/product/${productId}`, { withCredentials: true });
      if(response.status === 200) {
        toast.success(response.data.message);
        getProducts();
  
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(()=>{
    getProducts();
    // eslint-disable-next-line
  },[]) ; // Dependency array to re-run the effect when deleteProduct changes

  return (
    <ProductContext.Provider value={{ products, setProducts, createProduct, getProducts, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
