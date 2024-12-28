import React from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';
import styles from './loading.module.css';
const LoadingPage = () => {
  return (
    <Container fluid className={styles.loadingContainer}>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col xs="auto" className="text-center">
          <div className={styles.spinnerWrapper}>
            <Spinner animation="border" variant="warning" size="lg" />
            <div className={styles.loadingText}>
              <Alert variant="warning">
                <FaCog className="me-2" spin /> Loading, please wait...
              </Alert>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingPage;
