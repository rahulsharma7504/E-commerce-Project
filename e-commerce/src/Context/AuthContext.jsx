import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';
import toast from 'react-hot-toast';
import { useVendorProduct } from './VendorContext/VendorProductContext';
import { useProduct } from './AdminContext/Management/ProductsManageContext';
import { useCategory } from './AdminContext/CategoryManageContext';
import { useUserApiContext } from './UserContext/UserApiContext';
import { useAdminDashBoard } from './AdminContext/DashboardStats';
// Create context
export const AuthContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

// Custom hook to access AuthContext easily
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const { fetchAdminStats } = useAdminDashBoard();
  const { fetchCartItemsByProductId, fetchUserProfile, fetchProfileOrders, fetchprofileReviews, globalUser, setGlobalUser } = useUserApiContext();
  const { readCategories } = useCategory()
  const { getProducts, fetchUsers, fetchVendors } = useProduct();
  const { getVendorProducts, vendorAnalytics, vendorAllOrders, vendorAllSales } = useVendorProduct();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading is initially true
  const navigate = useNavigate();

  // Function to fetch user data
  const fetchUser = async (token) => {
    try {
      console.log(token)
      setLoading(true);  // Start loading when fetching user data
      const apiUrl = process.env.REACT_APP_API_URL;

      const axiosInstance = axios.create({
        baseURL: apiUrl,
      });
      const response = await axiosInstance.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }); 

      if (response.status === 200) {
        setUser(response.data);
        setGlobalUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage

        if (response.data.role === 'vendor') {
          navigate('/vendor');
          const vendorId = JSON.parse(localStorage.getItem('user'))?._id;

          setTimeout(async () => {
            await Promise.allSettled([
              getVendorProducts(vendorId),  // Fetch products for vendor
              readCategories(vendorId), // Read categories
              vendorAnalytics(vendorId),
              vendorAllOrders(vendorId), // Fetch vendor's all orders
              vendorAllSales(vendorId)// Fetch vendor's all sales
            ]);
          }, 100);

        } else if (response.data.role === 'admin') {
          navigate('/admin');
          // Fetch admin-related data after successful login
          await getProducts();
          await fetchUsers();
          await fetchVendors();
          await readCategories();
          await fetchAdminStats(); // Fetch admin dashboard statistics
        } else {
          navigate('/');
          await fetchUserProfile();
          await fetchProfileOrders();
          await fetchprofileReviews(); // Fetch user's reviews
          await fetchCartItemsByProductId();

        }
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
      setUser(null); // Set user to null if error occurs
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Check for user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // If user data exists in localStorage, set it in state
    } else {
      setUser(null); // Set user as null if no data exists in localStorage
    }
    setLoading(false); // Stop loading once the check is done
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const res = await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
      if (res.status === 200) {
        setUser(null);
        localStorage.removeItem('user'); // Remove user from localStorage
        toast.success('Logged out successfully');
        navigate('/login');  // Redirect to login page
      }
    } catch (error) {
      console.error('Failed to logout', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  // Context value to be provided
  const value = { user, loading, logout, fetchUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
