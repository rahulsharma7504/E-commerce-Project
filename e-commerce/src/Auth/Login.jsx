import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext, useAuth } from '../Context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import LoadingPage from './../Components/Loading/Loading';
import toast from 'react-hot-toast';
import styles from '../Styles/Login.module.css'; // Import the CSS Module

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { fetchUser } = useAuth();
    const navigate = useNavigate();
    const { loading, setLoading } = useContext(AuthContext); // Assuming `setLoading` is in your AuthContext

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/login`,
                { email, password },
                { withCredentials: true }
            );

            if (res.status === 200) {
                toast.success('Logged in successfully');
                fetchUser(); // Assuming this function updates user data
            } else {
                toast.error('Login failed. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred during login');
            } else if (error.request) {
                toast.error('Network error. Please check your connection');
            } else {
                toast.error('An unexpected error occurred');
            }

            console.error('Login failed', error); // Log error for debugging
        }
    };

    const isFormValid = email && password && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                />
                <button
                    onClick={handleLogin}
                    disabled={loading || !isFormValid}
                    className={styles.loginBtn}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className={styles.signupLink}>
                    <p>Don't have an account? <NavLink to="/sign-up">Sign Up</NavLink></p>
                </div>

                {loading && <LoadingPage />} {/* Display loading page while logging in */}
            </div>
        </div>
    );
}
