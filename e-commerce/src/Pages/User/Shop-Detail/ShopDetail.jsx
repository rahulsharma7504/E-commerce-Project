import React from 'react'
import User from '../../../Assets/img/user.jpg'
import product1 from '../../../Assets/img/product-1.jpg'
import product2 from '../../../Assets/img/product-2.jpg'
import product3 from '../../../Assets/img/product-3.jpg'
import { Tab, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Products from '../../Home/Products'
import { Carousel } from 'react-bootstrap';
import product4 from '../../../Assets/img/product-4.jpg'
const ShopDetail = () => {
    
    return (
        <>
            <div class="container-fluid">
                <div class="row px-xl-5">
                    <div class="col-12">
                        <nav class="breadcrumb bg-light mb-30">
                            <a class="breadcrumb-item text-dark" href="#">Home</a>
                            <a class="breadcrumb-item text-dark" href="#">Shop</a>
                            <span class="breadcrumb-item active">Shop Detail</span>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Shop Details here  */}
            <div class="container-fluid pb-5">
                <div class="row px-xl-5">
                    <div className="col-lg-5 mb-30">
                        <Carousel id="product-carousel" indicators={true} controls={false}>
                            <Carousel.Item>
                                <img className="d-block w-100 h-100" src={product1} alt="Image" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100 h-100" src={product2} alt="Image" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100 h-100" src={product3} alt="Image" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100 h-100" src={product4} alt="Image" />
                            </Carousel.Item>
                        </Carousel>
                        {/* Custom Carousel Controls */}
                        <a className="carousel-control-prev" href="#product-carousel" role="button" data-bs-slide="prev">
                            <i className="fa fa-2x fa-angle-left text-dark"></i>
                        </a>
                        <a className="carousel-control-next" href="#product-carousel" role="button" data-bs-slide="next">
                            <i className="fa fa-2x fa-angle-right text-dark"></i>
                        </a>
                    </div>

                    <div class="col-lg-7 h-auto mb-30">
                        <div class="h-100 bg-light p-30">
                            <h3>Product Name Goes Here</h3>
                            <div class="d-flex mb-3">
                                <div class="text-primary mr-2">
                                    <small class="fas fa-star"></small>
                                    <small class="fas fa-star"></small>
                                    <small class="fas fa-star"></small>
                                    <small class="fas fa-star-half-alt"></small>
                                    <small class="far fa-star"></small>
                                </div>
                                <small class="pt-1">(99 Reviews)</small>
                            </div>
                            <h3 class="font-weight-semi-bold mb-4">$150.00</h3>
                            <p class="mb-4">Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit
                                clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea
                                Nonumy</p>
                            <div class="d-flex mb-3">
                                <strong class="text-dark mr-3">Sizes:</strong>
                                <form>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="size-1" name="size" />
                                        <label class="custom-control-label" for="size-1">XS</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="size-2" name="size" />
                                        <label class="custom-control-label" for="size-2">S</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="size-3" name="size" />
                                        <label class="custom-control-label" for="size-3">M</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="size-4" name="size" />
                                        <label class="custom-control-label" for="size-4">L</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="size-5" name="size" />
                                        <label class="custom-control-label" for="size-5">XL</label>
                                    </div>
                                </form>
                            </div>
                            <div class="d-flex mb-4">
                                <strong class="text-dark mr-3">Colors:</strong>
                                <form>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="color-1" name="color" />
                                        <label class="custom-control-label" for="color-1">Black</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="color-2" name="color" />
                                        <label class="custom-control-label" for="color-2">White</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="color-3" name="color" />
                                        <label class="custom-control-label" for="color-3">Red</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="color-4" name="color" />
                                        <label class="custom-control-label" for="color-4">Blue</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="color-5" name="color" />
                                        <label class="custom-control-label" for="color-5">Green</label>
                                    </div>
                                </form>
                            </div>
                            <div class="d-flex align-items-center mb-4 pt-2">
                                <div class="input-group quantity mr-3" style={{ width: "130px" }}>
                                    <div class="input-group-btn">
                                        <button class="btn btn-primary btn-minus">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control bg-secondary border-0 text-center" value="1" />
                                    <div class="input-group-btn">
                                        <button class="btn btn-primary btn-plus">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <button class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i> Add ToCart</button>
                            </div>
                            <div class="d-flex pt-2">
                                <strong class="text-dark mr-2">Share on:</strong>
                                <div class="d-inline-flex">
                                    <a class="text-dark px-2" href="">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a class="text-dark px-2" href="">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                    <a class="text-dark px-2" href="">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                    <a class="text-dark px-2" href="">
                                        <i class="fab fa-pinterest"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row px-xl-5">
                    <div className="col">
                        <div className="bg-light p-30">
                            <Tab.Container id="product-tabs" defaultActiveKey="tab-pane-1">
                                <Nav variant="tabs" className="mb-4">
                                    <Nav.Item>
                                        <Nav.Link eventKey="tab-pane-1" className="text-dark">
                                            Description
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="tab-pane-2" className="text-dark">
                                            Information
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="tab-pane-3" className="text-dark">
                                            Reviews (0)
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="tab-pane-1" className="fade ">
                                        <h4 className="mb-3">Product Description</h4>
                                        <p>
                                            Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero
                                            aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor
                                            rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing
                                            kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata
                                            kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est,
                                            sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos
                                            consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus
                                            eirmod takimata dolor ea invidunt.
                                        </p>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab-pane-2" className="fade">
                                        <h4 className="mb-3">Additional Information</h4>
                                        <p>
                                            Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero
                                            aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor
                                            rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing
                                            kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata
                                            kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est,
                                            sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos
                                            consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus
                                            eirmod takimata dolor ea invidunt.
                                        </p>
                                        <Row>
                                            <Col md={6}>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item px-0">
                                                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                                    </li>
                                                </ul>
                                            </Col>
                                            <Col md={6}>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item px-0">
                                                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                                    </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab-pane-3" className="fade">
                                        <Row>
                                            <Col md={6}>
                                                <h4 className="mb-4">1 review for "Product Name"</h4>
                                                <div className="media mb-4">
                                                    <img
                                                        src="path-to-user-image"
                                                        alt="User"
                                                        className="img-fluid mr-3 mt-1"
                                                        style={{ width: '45px' }}
                                                    />
                                                    <div className="media-body">
                                                        <h6>
                                                            John Doe<small> - <i>01 Jan 2045</i></small>
                                                        </h6>
                                                        <div className="text-primary mb-2">
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star-half-alt"></i>
                                                            <i className="far fa-star"></i>
                                                        </div>
                                                        <p>
                                                            Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum
                                                            et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <h4 className="mb-4">Leave a review</h4>
                                                <small>Your email address will not be published. Required fields are marked *</small>
                                                <div className="d-flex my-3">
                                                    <p className="mb-0 mr-2">Your Rating * :</p>
                                                    <div className="text-primary">
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                    </div>
                                                </div>
                                                <Form>
                                                    <Form.Group>
                                                        <Form.Label>Your Review *</Form.Label>
                                                        <Form.Control as="textarea" id="message" rows={5} />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Your Name *</Form.Label>
                                                        <Form.Control type="text" id="name" />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Your Email *</Form.Label>
                                                        <Form.Control type="email" id="email" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-0">
                                                        <Button variant="primary" className="px-3" type="submit">
                                                            Leave Your Review
                                                        </Button>
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
            <Products />
        </>
    )
}

export default ShopDetail
