import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Create the Context
const UserApiContext = createContext();

// Create a Provider component
const UserApiProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [globalUser, setGlobalUser] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState(null)
    const [isBillingSaved, setIsBillingSaved] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const userId = JSON.parse(localStorage.getItem('user'))?._id;

    const [cart, setCart] = useState(null);

    // Totel Amount of Cart Items----------------------------------------------------------------
    const subtotal = cart?.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shipping = 10; // Example shipping cost
    const total = subtotal + shipping;


    // ----------------------------------------------------------------


    const fetchCartItemsByProductId = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user?._id) {
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

    const deleteItemFromCart = async (productId) => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))?._id

            // Sending DELETE request to remove item from cart
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${userId}/${productId}`, { withCredentials: true });

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



    //  For User Create Order 

    const handlePlaceOrder = async () => {
        if (!isBillingSaved) {
            toast.error("Please save your billing details first.");
            return;
        }
        const subtotal = cart?.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        const shipping = 10; // Example shipping cost
        const total = subtotal + shipping;

        const userId = JSON.parse(localStorage.getItem('user'))?._id;
        const orderData = {
            userId: userId,
            billingId: isBillingSaved._id,
            items: cart.items.map((item) => ({
                productId: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            })),
            totalAmount: total,
            paymentMethod: selectedPaymentMethod,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/create-order`, orderData, { withCredentials: true });

            if (response.status === 201) {
                toast.success('Order placed successfully');
                const { orderId } = response.data;
                handlePayment(orderId, total);

            }

            // Proceed to payment
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handlePayment = async (orderId, total) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-razorpay-order`, {
                amount: total * 100, // Convert to paise
                orderId,
            }, { withCredentials: true });

            // Razorpay payment options
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY, // Ensure your Razorpay Key is correct
                amount: data.order.amount, // Amount in paise
                currency: 'INR', // Currency code
                name: 'Multi_Shop App', // Your company or app name
                description: 'Test Transaction', // Description
                order_id: data.order.id, // Razorpay Order ID
                userId: JSON.parse(localStorage.getItem('user'))._id, // User ID from local storage
                handler: async function (response) {
                    // Payment success, send details to backend for verification
                    const paymentDetails = {
                        userId: userId,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        userId: JSON.parse(localStorage.getItem('user'))._id,
                        orderId: orderId, // Your order ID
                        amount: total, // The total amount for the order
                    };

                    // Send payment details to backend
                    await axios.post(`${process.env.REACT_APP_API_URL}/payment/verify-payment`, paymentDetails, { withCredentials: true });
                    // If payment is successful, you can proceed to update the order status in your backend or display a success message here


                    alert('Payment Successful');
                    fetchCartItemsByProductId();
                    window.location.href = '/profile'
                    // Optionally, you can redirect or display a success message here
                },
                prefill: {
                    name: JSON.parse(localStorage.getItem('user')).name,
                    email: JSON.parse(localStorage.getItem('user')).email,
                    contact: '9999999999', // User's contact number
                },
                theme: {
                    color: '#3399cc', // Theme color for Razorpay UI
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Error during payment:', error);
            alert('Payment failed. Please try again.');
        }
    };




    // User Profile Update and Management APIs=-----------------------------

    const fetchUserProfile = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setUser(user);

        }
        catch (error) {
            console.error('Error fetching user profile:', error);
            return;
        }
    }

    const fetchProfileOrders = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/user-orders/${user._id}`, { withCredentials: true });
            if (response.status === 200) {
                setOrders(response.data.orders);
            }
        }
        catch (error) {
            console.error('Error fetching user orders:', error);
            return;
        }
    }

    const fetchprofileReviews = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/user-reviews/${user._id}`, { withCredentials: true });
            if (response.status === 200) {
                setReviews(response.data.reviews);
            }
        }
        catch (error) {
            console.error('Error fetching user orders:', error);
            return;
        }
    }


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'user') {
            fetchCartItemsByProductId();
            fetchUserProfile();
            fetchProfileOrders();
            fetchprofileReviews();
        }

    }, [])

    const values = {
        user,
        orders,
        setOrders,
        setUser,
        addToCart,
        cart,
        reviews,
        isBillingSaved,
        setIsBillingSaved,
        setSelectedPaymentMethod,
        selectedPaymentMethod,
        handlePlaceOrder,
        deleteItemFromCart,
        fetchCartItemsByProductId,
        globalUser,
        setGlobalUser
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
