import React, { useEffect, useState } from 'react'
import User from '../../../Assets/img/user.jpg'
import product1 from '../../../Assets/img/product-1.jpg'
import product2 from '../../../Assets/img/product-2.jpg'
import product3 from '../../../Assets/img/product-3.jpg'
import { Tab, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import ReletedProducts from '../../Home/ReletedProducts'
import { Carousel } from 'react-bootstrap';
import product4 from '../../../Assets/img/product-4.jpg'
import { useUserData } from '../../../Context/UserContext/UserContext';
import { FaStar, FaStarHalfAlt, FaRegStar, FaRupeeSign, FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaMinus, FaPlug, FaPlus, FaUser } from 'react-icons/fa'; // Importing icons from react-icons
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../Components/Loading/Loading'
import { useUserApiContext } from '../../../Context/UserContext/UserApiContext'

const ShopDetail = () => {
    const { addToCart } = useUserApiContext();
    const totalStars = 5; // Total number of stars
    const { handleMouseLeave, comment, setComment, productDetails, loading, handleProductDetailsPage, handleToAddReview, rating, handleStarClick } = useUserData()
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams(); // Get productId from URL params



    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Number of full stars
        const halfStar = rating % 1 !== 0;  // Check if half star is needed
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <FaStar key={`full-${index}`} className="text-primary" />
                ))}
                {halfStar && <FaStarHalfAlt className="text-primary" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <FaStar key={`empty-${index}`} className="far fa-star" />
                ))}
            </>
        );
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1); // Decrease quantity
        }
    };

    // Function to increase the quantity
    const increaseQuantity = () => {
        setQuantity(quantity + 1); // Increase quantity
    };

    useEffect(() => {
        if (productId) { // Check if productId is available before making the request
            handleProductDetailsPage(productId);
        }
    }, [productId]); // Dependency on productId so that it refetches if productId changes


    {
        if (loading) return (
            <>
                <Loading />
            </>
        );
    }
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
                        {/* Dynamic Carousel Rendering */}
                        <Carousel id="product-carousel" indicators={true} controls={false}>
                            {productDetails && productDetails?.images?.length > 0 && productDetails?.images?.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img className="d-block w-100 h-100 img-fluid" src={image} alt={`Product Image ${index + 1}`} />
                                </Carousel.Item>
                            ))}
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
                            <h3>{productDetails && productDetails?.name}</h3>
                            <div className="d-flex mb-3">
                                <div className="text-primary mr-2">
                                    {productDetails && productDetails.length > 0 && (
                                        <div className="d-flex mb-3">
                                            <div className="text-primary mr-2">
                                                {productDetails?.reviews?.map((review, index) => (
                                                    <div key={index}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i}>
                                                                {i < Math.floor(review.rating) ? (
                                                                    <FaStar />
                                                                ) : i < Math.ceil(review.rating) ? (
                                                                    <FaStarHalfAlt />
                                                                ) : (
                                                                    <FaRegStar />
                                                                )}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                            <small className="pt-1">({productDetails?.reviews?.length} Reviews)</small>
                                        </div>
                                    )}
                                </div>
                                {/* <small className="pt-1">({productDetails.reviews.length} Reviews)</small> */}
                            </div>

                            <h3 class="font-weight-semi-bold mb-4"><FaRupeeSign />{productDetails && productDetails?.price}</h3>
                            <p class="mb-4">{productDetails && productDetails?.description.slice(0, 100) + ' ....'}</p>

                            <div class="d-flex mb-4">
                                <strong class="text-dark mr-3">Colors:</strong>
                                {
                                    productDetails && productDetails?.availableColors ? (
                                        productDetails?.availableColors?.map((color, index) => (
                                            <div key={index} className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" className="custom-control-input" id={`color-${index + 1}`} name="color" />
                                                <label className="custom-control-label" htmlFor={`color-${index + 1}`}>{color}</label>
                                            </div>
                                        ))
                                    ) : (
                                        <h2>No Color Available</h2>
                                    )
                                }

                            </div>
                            <div class="d-flex align-items-center mb-4 pt-2">
                                <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary btn-minus" onClick={decreaseQuantity}>
                                            <FaMinus /> {/* React icon for minus */}
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control bg-secondary border-0 text-center"
                                        value={quantity}
                                        readOnly
                                    />
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary btn-plus" onClick={increaseQuantity}>
                                            <FaPlus /> {/* React icon for plus */}
                                        </button>
                                    </div>
                                </div>
                                <button class="btn btn-primary px-3" onClick={() => addToCart(productDetails?._id, quantity)}><i class="fa fa-shopping-cart mr-1"></i> Add ToCart</button>
                            </div>
                            <div className="d-flex pt-2">
                                <strong className="text-dark mr-2">Share on:</strong>
                                <div className="d-inline-flex">
                                    <a className="text-dark px-2" href="">
                                        <FaFacebook /> {/* Facebook icon */}
                                    </a>
                                    <a className="text-dark px-2" href="">
                                        <FaTwitter /> {/* Twitter icon */}
                                    </a>
                                    <a className="text-dark px-2" href="">
                                        <FaLinkedin /> {/* LinkedIn icon */}
                                    </a>
                                    <a className="text-dark px-2" href="">
                                        <FaPinterest /> {/* Pinterest icon */}
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
                                        <Nav.Link eventKey="tab-pane-3" className="text-dark">
                                            Reviews {productDetails && productDetails?.reviews?.length}
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="tab-pane-1" className="fade ">
                                        <h4 className="mb-3">Product Description</h4>
                                        <p>
                                            {
                                                productDetails && productDetails?.description
                                                    ? productDetails?.description
                                                    : 'No Description Available'
                                            }
                                        </p>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab-pane-3" className="fade">
                                        <Row>
                                            <Col md={6}>
                                                {

                                                }

                                                <h4 className="mb-4">
                                                    {productDetails && productDetails?.reviews
                                                        ? `${productDetails?.reviews.length} reviews for ${productDetails.name}`
                                                        : "No reviews yet for this product"}
                                                </h4>

                                                <div>
                                                    {productDetails && productDetails?.reviews && productDetails.reviews.length > 0 ? (
                                                        productDetails.reviews.map((review, index) => (
                                                            <div className="media mb-4" key={index}>
                                                                {/* User Image or Default Icon */}
                                                                <div className="img-fluid mr-3 mt-1" style={{ width: '45px' }}>
                                                                    {review.user.image ? (
                                                                        <img
                                                                            src={review.user.image}
                                                                            alt={review.user.name}
                                                                            className="img-fluid"
                                                                            style={{ width: '45px' }}
                                                                        />
                                                                    ) : (
                                                                        <FaUser size={45} className="text-muted" /> // Use FaUser as default icon
                                                                    )}
                                                                </div>
                                                                <div className="media-body">
                                                                    {/* User's Name and Review Date */}
                                                                    <h6>
                                                                        {review.user.name}
                                                                        <small> - <i>{new Date(review.createdAt).toLocaleDateString()}</i></small>
                                                                    </h6>
                                                                    {/* Render Rating */}
                                                                    <div className="text-primary mb-2">
                                                                        {renderStars(review.rating)} {/* Render the stars based on rating */}
                                                                    </div>
                                                                    {/* Review Text */}
                                                                    <p>{review.comment}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No reviews yet for this product.</p>
                                                    )}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <h4 className="mb-4">Leave a review</h4>
                                                <small>Your email address will not be published. Required fields are marked *</small>
                                                <div className="d-flex my-3">
                                                    <p className="mb-0 mr-2">Your Rating * :</p>
                                                    <div className="text-primary d-flex">
                                                        {[...Array(totalStars)].map((_, index) => (
                                                            <div
                                                                key={index}
                                                                onClick={() => handleStarClick(index)} // Handle click to update rating
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                {rating > index ? (
                                                                    <FaStar size={30} color="gold" /> // Filled star
                                                                ) : (
                                                                    <FaRegStar size={30} color="gray" /> // Empty star
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <Form>
                                                    <Form.Group>
                                                        <Form.Label>Your Review *</Form.Label>
                                                        <Form.Control as="textarea" onChange={(e) => setComment(e.target.value)} id="message" rows={5} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-0">
                                                        <Button variant="primary" className="px-3" onClick={() => handleToAddReview(productDetails && productDetails._id)}>
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
            </div >
            <ReletedProducts />
        </>
    )
}

export default ShopDetail
