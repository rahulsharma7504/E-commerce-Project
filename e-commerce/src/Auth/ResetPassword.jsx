// ResetPassword.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import { useParams,  useNavigate} from 'react-router-dom'; // for handling reset token
import styles from '../Styles/ResetPassword.module.css'; // Import the CSS Module
import axios from 'axios';


const ResetPassword = () => {
  const history = useNavigate(); // for redirecting to login page after successful password reset
  const { tokenId } = useParams(); // Get the reset token from URL params

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setIsSuccess(false);
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/reset-password`,{
        token: tokenId,
        newPassword,
      });

      if (response.status === 200) {
        setIsSuccess(true);
        setMessage('Password reset successfully. You can now log in.');
        history('/login');

            } else {
        setIsSuccess(false);
        setMessage(response.data.message);
      }

      setNewPassword('');
      setConfirmPassword('');

    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Container className={`${styles.container}  justify-content-center align-items-center`}>
      <Row className={styles.formWrapper}>
        <Col md={6} sm={12} className={styles.formContainer}>
          <h2 className={styles.formTitle}>Reset Your Password</h2>
          {message && (
            <Alert variant={isSuccess ? 'success' : 'danger'} className={styles.messageAlert}>
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <div className={styles.inputIconContainer}>
                <FaLock className={styles.passwordIcon} />
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="6"
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <div className={styles.inputIconContainer}>
                <FaLock className={styles.passwordIcon} />
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength="6"
                />
              </div>
            </Form.Group>
            <Button type="submit" variant="primary" className={styles.submitButton}>
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
