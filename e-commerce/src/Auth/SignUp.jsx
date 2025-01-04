import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
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

      // Make sure to await the axios request to resolve it properly
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { name, email, password, phone });

      if (res.status === 201) {
        toast.success('Registration successful');

        // Clear form fields upon successful registration
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: ''
        });

        window.location.href = '/login';
      }
    } catch (error) {
      console.error("Registration failed", error);

      if (error.response) {
        toast.error(error.response.data.message || 'Something went wrong. Please try again!');
      } else if (error.request) {
        toast.error('Network error. Please check your connection and try again!');
      } else {
        toast.error('An error occurred while processing your request. Please try again later!');
      }

      setFormData({
        name: '',
        email: '',
        password: '',
        phone: ''
      });
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
