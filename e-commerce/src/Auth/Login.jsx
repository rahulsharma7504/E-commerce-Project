import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext, useAuth } from '../Context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import LoadingPage from './../Components/Loading/Loading';
import toast from 'react-hot-toast';
import styles from '../Styles/Login.module.css'; // Import the CSS Module
import { FaUser, FaLock } from 'react-icons/fa'; // Import icons
import loginImage from '../Assets/img/login_image.jpg'; // Import login image

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const { fetchUser } = useAuth();

    const navigate = useNavigate();
    const { loading, setLoading } = useContext(AuthContext); // Assuming `setLoading` is in your AuthContext

    const handleLogin = async () => {
        try {
            setFormLoading(true); // Start loading when login is attempted
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/login`,
                { email, password },
                { withCredentials: true }
            );

            if (res.status === 200) {
                toast.success('Logged in successfully');
                setFormLoading(false)
                
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
        }finally{
            setFormLoading(false); // Stop loading after login attempt
        }
    };

    const isFormValid = email && password && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.imageContainer}>
                <img src={loginImage}  alt="Login" className={styles.loginImage} />
            </div>
            <div className={styles.loginForm}>
                <h1>Welcome Back!</h1>
                <p className={styles.subtitle}>Please login to your account</p>

                <div className={styles.inputContainer}>
                    <FaUser className={styles.icon} />
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <FaLock className={styles.icon} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputField}
                    />
                </div>

                <button 
                    onClick={handleLogin}
                    disabled={formLoading || !isFormValid}
                    className={styles.loginBtn}
                >
                    {formLoading ? 'Logging in...' : 'Login'}
                </button>

                <div className={styles.links}>
                    <p>Don't have an account? <NavLink to="/sign-up" className={styles.link}>Sign Up</NavLink></p>
                    <p>Forgot password? <NavLink to="/forgot-password" className={styles.link}>Reset Password</NavLink></p>
                </div>

                {loading && <LoadingPage />} {/* Display loading page while logging in */}
            </div>
        </div>
    );
}
