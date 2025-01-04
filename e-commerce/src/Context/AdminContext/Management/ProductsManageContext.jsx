import React, { createContext, useState, useContext } from 'react';

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
  const createProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  // Read Products (Get all products)
  const getProducts = () => {
    return products;
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
  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, createProduct, getProducts, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
