import React from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminFooter.module.css'; // Import the CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container fluid>
        <Row className="text-center text-md-start">
          {/* Left Section */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className={styles.footerTitle}>Admin Panel</h5>
            <p className={styles.footerDescription}>
              Manage your orders, products, and vendors seamlessly with our Admin Panel.
            </p>
          </Col>

          {/* Quick Links Section */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className={styles.footerTitle}>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="/admin" className={styles.footerLink}>Dashboard</Nav.Link>
              <Nav.Link href="/admin-orders" className={styles.footerLink}>Orders</Nav.Link>
              <Nav.Link href="/admin-products" className={styles.footerLink}>Products</Nav.Link>
              <Nav.Link href="/admin-users" className={styles.footerLink}>Users</Nav.Link>
              <Nav.Link href="/admin-vendors" className={styles.footerLink}>Vendors</Nav.Link>
            </Nav>
          </Col>

          {/* Social Links Section */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className={styles.footerTitle}>Follow Us</h5>
            <div className={styles.socialIcons}>
              <Button variant="link" className={styles.iconButton} href="https://facebook.com" target="_blank">
                <FaFacebook className={styles.socialIcon} />
              </Button>
              <Button variant="link" className={styles.iconButton} href="https://twitter.com" target="_blank">
                <FaTwitter className={styles.socialIcon} />
              </Button>
              <Button variant="link" className={styles.iconButton} href="https://linkedin.com" target="_blank">
                <FaLinkedin className={styles.socialIcon} />
              </Button>
              <Button variant="link" className={styles.iconButton} href="https://github.com" target="_blank">
                <FaGithub className={styles.socialIcon} />
              </Button>
              <Button variant="link" className={styles.iconButton} href="mailto:admin@example.com">
                <FaEnvelope className={styles.socialIcon} />
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <p className={styles.footerBottom}>
              &copy; {new Date().getFullYear()} Admin Panel | All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
