import React from 'react'
import carousel1 from '../../Assets/img/carousel-1.jpg'
import carousel2 from '../../Assets/img/carousel-2.jpg'
import carousel3 from '../../Assets/img/carousel-3.jpg'
import offer1 from '../../Assets/img/offer-1.jpg'
import offer2 from '../../Assets/img/offer-2.jpg'
import { Carousel, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
const Carousels = () => {
    const navigate=useNavigate();
    return (
        <>
            <div className="container-fluid mb-3">
                <div className="row px-xl-5">
                    <Col lg={8}>
                        <Carousel fade>
                            {/* First Carousel Item */}
                            <Carousel.Item style={{ height: "430px" }}>
                                <img
                                    className="d-block w-100 h-100"
                                    src={carousel1}
                                    alt="Men Fashion"
                                    style={{ objectFit: "cover" }}
                                />
                                <Carousel.Caption className="d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3" style={{ maxWidth: "700px" }}>
                                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Men Fashion</h1>
                                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                                            Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam.
                                        </p>
                                        <Button onClick={()=>navigate('/shop')} variant="outline-light" className="py-2 px-4 mt-3 animate__animated animate__fadeInUp">
                                            Shop Now
                                        </Button>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>

                            {/* Second Carousel Item */}
                            <Carousel.Item style={{ height: "430px" }}>
                                <img
                                    className="d-block w-100 h-100"
                                    src={carousel2}
                                    alt="Women Fashion"
                                    style={{ objectFit: "cover" }}
                                />
                                <Carousel.Caption className="d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3" style={{ maxWidth: "700px" }}>
                                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Women Fashion</h1>
                                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                                            Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam.
                                        </p>
                                        <Button onClick={()=>navigate('/shop')} variant="outline-light" className="py-2 px-4 mt-3 animate__animated animate__fadeInUp">
                                            Shop Now
                                        </Button>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>

                            {/* Third Carousel Item */}
                            <Carousel.Item style={{ height: "430px" }}>
                                <img
                                    className="d-block w-100 h-100"
                                    src={carousel3}
                                    alt="Kids Fashion"
                                    style={{ objectFit: "cover" }}
                                />
                                <Carousel.Caption className="d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3" style={{ maxWidth: "700px" }}>
                                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Kids Fashion</h1>
                                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                                            Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam.
                                        </p>
                                        <Button  onClick={()=>navigate('/shop')} variant="outline-light" className="py-2 px-4 mt-3 animate__animated animate__fadeInUp">
                                            Shop Now
                                        </Button>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col lg={4}>
                        {/* First Offer */}
                        <div className="product-offer mb-30" style={{ height: "200px" }}>
                            <img className="img-fluid" src={offer1} alt="Offer 1" />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Special Offer</h3>
                                <Button  onClick={()=>navigate('/shop')} variant="primary">Shop Now</Button>
                            </div>
                        </div>

                        {/* Second Offer */}
                        <div className="product-offer mb-30" style={{ height: "200px" }}>
                            <img className="img-fluid" src={offer2} alt="Offer 2" />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Special Offer</h3>
                                <Button  onClick={()=>navigate('/shop')} variant="primary">Shop Now</Button>
                            </div>
                        </div>
                    </Col>
                </div>
            </div>

        </>
    )
}

export default Carousels;
