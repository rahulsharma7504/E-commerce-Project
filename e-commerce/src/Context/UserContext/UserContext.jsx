import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';


const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const navigate=useNavigate();
    const [rating, setRating] = useState(0);
    const [loading, setLoading]=useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [allshopProducts, setAllShopProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5); // Assuming you get total pages from the API response
    const [sortOption, setSortOption] = useState('');  
    const [search, setSearch] = useState(null);  
    const [productDetails, setproductDetails] = useState(null);  
    const [comment, setComment] = useState(null);  
    const [reletedProducts, setReletedProducts] = useState(null);  



    // User Pagination API calling 


    const fetchProducts = async (pageNumber) => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/shop/products/pagination?page=${pageNumber}`);
          setAllShopProducts(response.data.products);
          setCurrentPage(response.data.currentPage); // Assume API response includes totalPages
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

    
      const handelPriceFilters = async (filtervalue) => {
        try {
            setLoading(true);
            // Replace with your API call or data fetching logic
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/shop/products/filters?price=${filtervalue}`);
            if (response.status === 200) {
                setAllShopProducts(response.data);
            }
            setLoading(false);
           
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      const handelColorFilters = async (filtervalue) => {
        try {
            setLoading(true);
            // Replace with your API call or data fetching logic
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/shop/products/filters-color?color=${filtervalue}`);
            if (response.status === 200) {
                setAllShopProducts(response?.data);
            }
            setLoading(false);
           
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };


      const handleSort = async (option) => {
        try {
          setSortOption(option);  // Update selected option

          const response = await axios.get(`${process.env.REACT_APP_API_URL}/shop/products/sorting?sortBy=${option}`); // API call with the selected sort option
          setAllShopProducts(response.data);  // Store the fetched sorted products
        } catch (error) {
          console.error('Error fetching sorted products:', error);
        }
      };

      



      const handleSearch = async (serachValue) => {
        try {
          
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/shop/products/search?search=${serachValue}`); // API call with the selected sort option
          setAllShopProducts(response.data);  // Store the fetched sorted products
        } catch (error) {
          console.error('Error fetching sorted products:', error);
        }
      };


//  Make Rating Functions


const handleStarClick = (index) => {
  setRating(index + 1); // Set rating to the clicked star index
};

// Handle mouse enter to highlight stars
const handleMouseEnter = (index) => {
  setRating(index + 1);
};

// Handle mouse leave to reset the rating
const handleMouseLeave = () => {
  setRating(0);
};




// Get One Product By ID





const handleProductDetailsPage = async (productId) => {
  try {
    setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/${productId}`); // API call with the productId
      setproductDetails(response.data.data); // Store the fetched product details
      setReletedProducts(response.data.relatedProducts);

      setLoading(false);
  } catch (error) {
      console.error('Error fetching product details:', error);
  }
};
// Give review to product



const handleToAddReview = async (productID) => {
  try {

    // Get user info from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      toast.error('Please login to add a review');
      return;
    }

    const { _id: userId } = JSON.parse(userData);
    if (!userId) {
      toast.error('User ID not found, please login');
      return;
    }
    setLoading(true)
    // Prepare form data
    const formData = {
      userId,
      productId: productID,
      rating,  // Assuming rating and comment are passed as parameters
      comment,
    };

    // Send the review to the API
    const response = await axios.post(`http://localhost:4000/api/reviews`, formData, { withCredentials: true });

    // Handle successful response
    if (response.status === 201) {
      toast.success('Review submitted successfully!');
      setproductDetails(response.data.data);
      setLoading(false)
      // Optionally clear or reset relevant states here
    }
  } catch (error) {
    // Graceful error handling
    const errorMessage = error.response?.data?.message || 'An error occurred while submitting the review';
    toast.error(errorMessage);
  }finally{
    setLoading(false)
  }
};




    const shopProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/shop/products`);
            if (response.status === 200) {
                setAllShopProducts(response.data);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    // Function to fetch products
    const HomeProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
            if (response.status === 200) {
                setAllProducts(response.data);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Function to fetch categories
    const HomeCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`);
            if (response.status === 200) {
                setAllCategory(response?.data);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // Effect for fetching data
    useEffect(() => {
        HomeCategory();
        HomeProducts();
        shopProducts();
    }, []);

    // Checking user role from localStorage (useEffect can be here)
    useEffect(() => {
        if (localStorage.getItem('user')) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser.role === 'user') {
                // You can handle specific logic for the user role if needed
            }
        }
    }, []);

    const values = {
        allProducts,
        allCategory,
        allshopProducts,
        setAllShopProducts,
        setAllProducts,
        setAllCategory,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        fetchProducts,
        handelPriceFilters,
        handelColorFilters,
        handleSort,
        handleSearch,
        handleMouseLeave,
        handleMouseEnter,
        rating,
        handleStarClick,
        productDetails,
        setproductDetails,
        loading,
        setLoading,
        setComment,
        handleProductDetailsPage,
        comment,
        handleToAddReview,
        reletedProducts
    }
    return (

        <>

            <UserDataContext.Provider value={values}>
                {children}
            </UserDataContext.Provider>
        </>
    );
};

// Custom hook to access the user data context
export const useUserData = () => {
    return useContext(UserDataContext);
};
