// ForgetPassword.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { AiOutlineMail } from 'react-icons/ai';
import styles from '../Styles/Forgot.module.css'; // Import the CSS Module
import axios from 'axios';


const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`,{email:email});
      if (response.status === 200) {
        setIsSuccess(true);
        setMessage('✅ Reset password link has been sent to your email.');
        setEmail('');
      } 
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Container className={`${styles.container}`}>
      <Row className={styles.formWrapper}>
        <Col md={6} sm={12} className={styles.formContainer}>
          <h2 className={styles.formTitle}>Forgot Password</h2>
          {message && (
            <Alert variant={isSuccess ? 'success' : 'danger'} className={styles.messageAlert}>
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <div className={styles.inputIconContainer}>
                <AiOutlineMail className={styles.emailIcon} />
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </Form.Group>
            <Button type="submit" variant="primary" className={styles.submitButton}>
              Send Reset Link
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPassword;
