import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { FaHome, FaChartLine, FaClipboardList, FaBox, FaUsers, FaCog,  FaSignOutAlt  } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminNavbar.module.css'; // Import the CSS module
import {  useNavigate } from 'react-router-dom';
import { logout,useAuth} from './../../Context/AuthContext';
const AdminNavbar = () => {
  const {logout}=useAuth();
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className={styles.navbar} variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Button} onClick={()=>navigate('/admin')}  className={styles.navbarBrand } >Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Dashboard Section */}
            <Nav.Link onClick={()=>navigate('/admin')}  className={styles.navLink}>
              <FaChartLine style={{ color: 'yellow' }} /> Dashboard
            </Nav.Link>
            <Nav.Link  onClick={()=>navigate('/admin-orders')} className={styles.navlink}>
              <FaClipboardList style={{ color: 'yellow' }} /> Orders
            </Nav.Link>
            <Nav.Link onClick={()=>navigate('/admin-products')} className={styles.navLink}>
              <FaBox style={{ color: 'yellow' }} /> Products
            </Nav.Link>

            {/* User and Vendor Management */}
            <NavDropdown title="Management" id="basic-nav-dropdown" className={styles.navLink}>
              <NavDropdown.Item onClick={()=>navigate('/admin-users')} className={styles.navDropdownItem}>
                <FaUsers style={{ color: 'gray' }} /> Users
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate('/admin-vendors')} className={styles.navDropdownItem}>
                <FaUsers style={{ color: 'gray' }} /> Vendors
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate('/admin-category')} className={styles.navDropdownItem}>
                <FaUsers style={{ color: 'gray' }} /> Category
              </NavDropdown.Item>
            </NavDropdown>

            {/* Analytics and Revenue */}
            <Nav.Link onClick={()=>navigate('/admin-revenue')}className={styles.navLink}>
              <FaChartLine /> Revenue
            </Nav.Link>
            <Nav.Link onClick={()=>navigate('/admin-stats')} className={styles.navLink}>
              <FaChartLine style={{ color: 'yellow' }} /> Stats
            </Nav.Link>

            {/* Settings */}
            <Nav.Link onClick={()=>navigate('/admin-settings')} className={styles.navLink}>
              <FaCog style={{ color: 'yellow' }} /> Settings
            </Nav.Link>
            <Nav.Link onClick={logout} className={styles.navLink}>
              <FaSignOutAlt style={{ color: 'yellow' }} /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
