import React from 'react'
import { FaAngleDoubleUp, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-dark text-secondary">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
            <p className="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
            <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
            <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
            <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Home</a>
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Our Shop</a>
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Shop Detail</a>
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Checkout</a>
                  <a className="text-secondary" href="#"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">My Account</h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Home</a>
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Our Shop</a>
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Shop Detail</a>
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                  <a className="text-secondary mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Checkout</a>
                  <a className="text-secondary" href="#"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                <form action="">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Your Email Address"/>
                      <div className="input-group-append">
                        <button className="btn btn-primary">Sign Up</button>
                      </div>
                  </div>
                </form>
                <h6 className="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                <div className="d-flex">
                  <a className="btn btn-primary btn-square mr-2" href="#"><FaTwitter/></a>
                  <a className="btn btn-primary btn-square mr-2" href="#"><FaFacebook/></a>
                  <a className="btn btn-primary btn-square mr-2" href="#"><FaLinkedin/></a>
                  <a className="btn btn-primary btn-square" href="#"><FaInstagram/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-top mx-xl-5 py-4" style={{borderColor: "rgba(256, 256, 256, .1);"}}>
          <div className="col-md-6 px-xl-0">
            <p className="mb-md-0 text-center text-md-left text-secondary">
              &copy; <a c="text-primary" href="#">Domain</a>. All Rights Reserved. Designed
              by
              <a className="text-primary" href="https://htmlcodex.com">HTML Codex</a>
              <br/>Distributed By: <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
            </p>
          </div>
          <div className="col-md-6 px-xl-0 text-center text-md-right">
            <img className="img-fluid" src="img/payments.png" alt=""/>
          </div>
        </div>
      </div>

    <a href="#" class="btn btn-primary back-to-top"><FaAngleDoubleUp/> </a>


    </>
  )
}

export default Footer
