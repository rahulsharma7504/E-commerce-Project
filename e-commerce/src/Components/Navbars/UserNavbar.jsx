import React, { useState } from 'react'
import { useAuth } from '../../Context/AuthContext';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown, Button, Badge, Collapse } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
const UserNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  return (
    <>
      <div class="container-fluid">
        <div class="row bg-secondary py-1 px-xl-5">
          <div class="col-lg-6 d-none d-lg-block">
            <div class="d-inline-flex align-items-center h-100">
              <a class="text-body mr-3" href="">About</a>
              <a class="text-body mr-3" href="">Contact</a>
              <a class="text-body mr-3" href="">Help</a>
              <a class="text-body mr-3" href="">FAQs</a>
            </div>
          </div>
          <div class="col-lg-6 text-center text-lg-right">
            <div class="d-inline-flex align-items-center">
              <DropdownButton
                variant="light"
                size="sm"
                id="dropdown-custom-components"
                title="My Account"
              >
                {
                  user ? (
                    <>
                      <Dropdown.Item as="button" onClick={() => logout()}>Logout</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => navigate('/profile')}>Profile</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => navigate('/shop/cart')}>Cart</Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item as="button" onClick={() => navigate('/login')}>Sign in</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => navigate('/sign-up')}>Sign up</Dropdown.Item>
                    </>
                  )
                }
              </DropdownButton>

              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">EN</button>
                <div class="dropdown-menu dropdown-menu-right">
                  <button class="dropdown-item" type="button">FR</button>
                  <button class="dropdown-item" type="button">AR</button>
                  <button class="dropdown-item" type="button">RU</button>
                </div>
              </div>
            </div>
            <div class="d-inline-flex align-items-center d-block d-lg-none">
              <a href="" class="btn px-0 ml-2">
                <i class="fas fa-heart text-dark"></i>
                <span class="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
              </a>
              <a href="" class="btn px-0 ml-2">
                <i class="fas fa-shopping-cart text-dark"></i>
                <span class="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
              </a>
            </div>
          </div>
        </div>
        <div class="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div class="col-lg-4" >
            <Link class="text-decoration-none" to='/'>
              <span class="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
              <span class="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
            </Link>
          </div>
          <div class="col-lg-4 col-6 text-left">
            <form action="">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for products" />
                <div class="input-group-append">
                  <span class="input-group-text bg-transparent text-primary">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div class="col-lg-4 col-6 text-right">
            <p class="m-0">Customer Service</p>
            <h5 class="m-0">+012 345 6789</h5>
          </div>
        </div>
      </div>
      <div class="container-fluid bg-dark mb-30">
        <div class="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <button
              className="btn d-flex align-items-center justify-content-between bg-primary w-100"
              style={{ height: "65px", padding: "0 30px" }}
              onClick={() => setOpen(!open)}
            >
              <h6 className="text-dark m-0">
                <i className="fa fa-bars mr-2"></i>Categories
              </h6>
              <i className="fa fa-angle-down text-dark"></i>
            </button>

            <Collapse in={open}>
              <div>
                <nav
                  className=" navbar navbar-light align-items-end p-0 bg-light  navbar navbar-vertical  w-100 position-absolute"
                  style={{ zIndex: 999, top: '65px', width: '100%' }} >
                  <div className="navbar-nav w-100">

                    <a href="#" className="nav-item nav-link">Shirts</a>
                    <a href="#" className="nav-item nav-link">Jeans</a>
                    <a href="#" className="nav-item nav-link">Swimwear</a>
                    <a href="#" className="nav-item nav-link">Sleepwear</a>
                    <a href="#" className="nav-item nav-link">Sportswear</a>
                    <a href="#" className="nav-item nav-link">Jumpsuits</a>
                    <a href="#" className="nav-item nav-link">Blazers</a>
                    <a href="#" className="nav-item nav-link">Jackets</a>
                    <a href="#" className="nav-item nav-link">Shoes</a>
                  </div>
                </nav>
              </div>
            </Collapse>
          </div>
          <div class="col-lg-9">
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <Link to="/shop-detail" class="text-decoration-none d-block d-lg-none">
                <span class="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                <span class="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
              </Link>
              <Navbar.Toggle aria-controls="navbarCollapse" onClick={() => setNavOpen(!isNavOpen)} />
              <Collapse in={isNavOpen}>
                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                  <Nav className="navbar-nav mr-auto py-0">
                    <Nav.Link as={Link} to="/" className="nav-item nav-link active">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/shop" className="nav-item nav-link">
                      Shop
                    </Nav.Link>
                   
                  </Nav>

                  {/* Right-aligned buttons */}
                  <Nav className="ml-auto py-0 d-none d-lg-block">
                    <Button variant="link" className="px-0">
                      <FaHeart className="text-primary" />
                      <Badge pill className="text-dark border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>
                        0
                      </Badge>
                    </Button>

                    <Button variant="link" className="px-0 ml-3" onClick={()=> navigate('/shop/cart')}>
                      <FaShoppingCart className="text-primary" />
                      <Badge pill className="text-dark border  rounded-circle" style={{ paddingBottom: '2px' }}>
                        0
                      </Badge>
                    </Button>
                  </Nav>
                </div>
              </Collapse>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserNavbar
