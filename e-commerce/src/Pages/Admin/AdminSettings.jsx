import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaUser, FaKey, FaBell, FaPalette, FaSave } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminSettings.module.css'; // Import the custom CSS file for styling

const AdminSettingsPage = () => {
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    enableNotifications: true,
    theme: 'light',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    console.log('Settings Updated:', formData);
  };

  return (
    <Container fluid className={styles.settingsContainer}>
      <Row className="mb-4">
        {/* Profile Settings */}
        <Col md={6}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title><FaUser /> Profile Settings</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Account Settings */}
        <Col md={6}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title><FaKey /> Account Settings</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="currentPassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="newPassword" className="mt-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        {/* Notification Settings */}
        <Col md={6}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title><FaBell /> Notification Settings</Card.Title>
              <Form>
                <Form.Group controlId="enableNotifications">
                  <Form.Check
                    type="checkbox"
                    label="Enable Notifications"
                    name="enableNotifications"
                    checked={formData.enableNotifications}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Theme Settings */}
        <Col md={6}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title><FaPalette /> Theme Settings</Card.Title>
              <Form>
                <Form.Group controlId="theme">
                  <Form.Label>Select Theme</Form.Label>
                  <Form.Control
                    as="select"
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                  >
                    <option value="light">Light Theme</option>
                    <option value="dark">Dark Theme</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Save Changes Button */}
      <Row>
        <Col md={12} className="text-center">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            <FaSave /> Save Changes
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettingsPage;
