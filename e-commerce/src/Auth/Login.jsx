import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext, useAuth } from '../Context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import LoadingPage from './../Components/Loading/Loading';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { fetchUser } = useAuth();
    const navigate = useNavigate();
    const { loading, setLoading } = useContext(AuthContext); // Assuming `setLoading` is in your AuthContext
    
    const handleLogin = async () => {
        try {
    
            // Sending login request
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/login`,
                { email, password },
                { withCredentials: true }
            );
    
            // Handle loading state after request is complete
    
            if (res.status === 200) {
                toast.success('Logged in successfully');
                fetchUser(); // Assuming this function updates user data
                // navigate('/dashboard'); // Redirect to the dashboard (or wherever you want after login)
            } else {
                toast.error('Login failed. Please try again.');
            }
        } catch (error) {
    
            if (error.response) {
                // Server responded with an error
                toast.error(error.response.data.message || 'An error occurred during login');
            } else if (error.request) {
                // No response received from server
                toast.error('Network error. Please check your connection');
            } else {
                // Something went wrong in the request setup
                toast.error('An unexpected error occurred');
            }
    
            console.error('Login failed', error); // Log error for debugging
        }
    };

    // Basic email and password validation
    const isFormValid = email && password && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);

    return (
        <div>
            <h1>Login</h1>
            
            <input
                type="email"
                placeholder="Email"
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button onClick={handleLogin} disabled={loading || !isFormValid}>
                {loading ? 'Logging in...' : 'Login'}
            </button>

            <div>
                <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
            </div>

            {loading && <LoadingPage />} {/* Display loading page while logging in */}
        </div>
    );
}
