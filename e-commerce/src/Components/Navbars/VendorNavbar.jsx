import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { FaHome, FaUserCircle, FaBox, FaListAlt, FaChartBar, FaSignInAlt, FaUserPlus, FaBars } from 'react-icons/fa'; // Font Awesome icons
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
// import styles from "../../Styles/VendorCSS/vendorDashboard.module.css";

const MyNavbar = () => {
  const {logout}=useAuth()
  const navigate=useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        {/* Logo Section */}
       <Link to={'/vendor'}> <Navbar.Brand onClick={()=>navigate('/vendor')} >
          <FaHome /> Vendor Dashboard
        </Navbar.Brand>
        </Link>

        {/* Toggler for mobile view */}
        <Navbar.Toggle aria-controls="navbar-nav">
          <FaBars />
        </Navbar.Toggle>

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
           
            {/* Vendor Dashboard dropdown */}
            <NavDropdown title={<span><FaChartBar /> Vendor Dashboard</span>} id="vendor-dashboard-dropdown">
              <NavDropdown.Item  onClick={()=>navigate('/vendor-orders')}>
                <FaListAlt /> Orders
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate('/vendor-sales')}>
                <FaBox /> Sales
              </NavDropdown.Item>
             
            </NavDropdown>

            {/* Product Management link */}
            <Nav.Link onClick={()=>navigate('/vendor-products')}>
              <FaBox /> Product Management
            </Nav.Link>

            {/* Order Management link */}
            <Nav.Link onClick={()=>navigate('/vendor-orders-manage')}>
              <FaListAlt /> Order Management
            </Nav.Link>


           
          </Nav>

          {/* Optionally add a Button for custom action */}
          <Button variant="outline-light" onClick={logout}>
            Log-Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
