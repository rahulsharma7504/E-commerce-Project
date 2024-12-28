import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext, useAuth } from '../Context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom'
import LoadingPage from './../Components/Loading/Loading';
import toast from 'react-hot-toast';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { fetchUser } = useAuth()
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const useAuthentication = () => useContext(AuthContext)
    const { loading } = useAuthentication();

    const handleLogin = async () => {
        try {
           var res= await axios.post('http://localhost:4000/api/login', { email, password }, { withCredentials: true });
           if(loading) return <LoadingPage/>
           if(res.status === 200) {
            toast.success('Logged in successfully');
                fetchUser();
           }
        } catch (error) {
            alert(error.response.data.message);
            console.error("Login failed", error);
        }
    };
    // atul23@gmail.com

    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
