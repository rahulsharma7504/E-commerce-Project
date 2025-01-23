import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Create the Context
const UserApiContext = createContext();

// Create a Provider component
const UserApiProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    const fetchCartItemsByProductId = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
          if (!user ||!user?._id) {
            throw new Error('User ID is required');
          }
         
      
          // Send GET request to fetch cart items by userId
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart-items/${user?._id}`, { withCredentials: true });
      
          if (response.status === 200) {
            setCart(response.data);
          } else {
            // Handle unsuccessful response
            console.error('Error fetching cart items:', response.data.message);
            return [];
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
          return [];
        }
      };
      
      const deleteItemFromCart = async ( productId) => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))?._id

          // Sending DELETE request to remove item from cart
          const response = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${userId}/${productId}`, {withCredentials: true});
          
          // Update the cart state after deleting item
          if (response.status === 200) {
            toast.success(response.data.message); // Success message
            // Remove the deleted item from the cart
            fetchCartItemsByProductId();
          }
        } catch (error) {
          toast.error('Error deleting item from the cart');
        }
      };
    




    const addToCart = async (productId, quantity) => {
        try {
            if (!productId || !quantity) {
                toast.error('Invalid product or quantity');
                return;
            }

            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user._id) {
                toast.error('You must be logged in to add items to the cart');
                return;
            }

            const userId = user._id;
            const body = {
                userId: userId,
                quantity: quantity,
                productId
            };

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/cart-add`, body, { withCredentials: true });

            if (response.status === 200) {
                toast.success(response.data.message);
                fetchCartItemsByProductId();
            }
        } catch (error) {
            // Log the error to see its structure and details
            console.error('Error adding to cart:', error);

            // Check if error.response exists and handle it
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred while adding to the cart.');
            }
        }
    };


useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.role=== 'user'){
        fetchCartItemsByProductId();
    }

},[])

    const values = {
        addToCart,
        cart,
        deleteItemFromCart,
        fetchCartItemsByProductId
    }

    return (
        <UserApiContext.Provider value={values}>
            {children}
        </UserApiContext.Provider>
    );
};
const useUserApiContext = () => {
    return useContext(UserApiContext)
}
export { useUserApiContext, UserApiContext, UserApiProvider };
