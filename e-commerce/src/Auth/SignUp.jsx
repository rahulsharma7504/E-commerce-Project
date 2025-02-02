import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import styles from '../Styles/signup.module.css'; // Importing the CSS Module
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa'; // Importing icons
import loginImage from '../Assets/img/login_image.jpg';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password, phone } = formData;
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { name, email, password, phone });

      if (res.status === 201) {
        toast.success('Registration successful');
        setFormData({ name: '', email: '', password: '', phone: '' });
        window.location.href = '/login';
      }
    } catch (error) {
      console.error("Registration failed", error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again!');
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.imageContainer}>
        <img src={loginImage} alt="Sign Up" className={styles.signupImage} />
      </div>

      <div className={styles.signupForm}>
        <h2>Create Your Account</h2>
        <p className={styles.subtitle}>Join us and start your journey today!</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <FaUser className={styles.icon} />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          </div>

          <div className={styles.formGroup}>
            <FaEnvelope className={styles.icon} />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
          </div>

          <div className={styles.formGroup}>
            <FaLock className={styles.icon} />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          </div>

          <div className={styles.formGroup}>
            <FaPhone className={styles.icon} />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
          </div>

          <button type="submit" className={styles.submitBtn}>Sign Up</button>

          <p className={styles.loginText}>
            Already have an account? <Link to="/login" className={styles.link}>Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
