import React from 'react'
import Product1 from '../../Assets/img/product-1.jpg'
import Product2 from '../../Assets/img/product-2.jpg'
import Product3 from '../../Assets/img/product-3.jpg'
import Product4 from '../../Assets/img/product-4.jpg'
import Product5 from '../../Assets/img/product-5.jpg'
import Product6 from '../../Assets/img/product-6.jpg'
import Product7 from '../../Assets/img/product-7.jpg'
import Product8 from '../../Assets/img/product-8.jpg'
import { useUserData } from '../../Context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom'

const Products = () => {
    const navigate=useNavigate();
    const { reletedProducts } = useUserData();
    return (
        <>
            <div class="container-fluid pt-5 pb-3">
                <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Releted Products</span></h2>
                <div class="row px-xl-5">
                    {reletedProducts?.length === 0 ? (
                        <div>No products found</div>
                    ) : (
                        reletedProducts?.map((product, index) => (
                            <div class="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
                                <div class="product-item bg-light mb-4">
                                    <div class="product-img position-relative overflow-hidden">
                                        {product?.images && product?.images[0] && (
                                            <img class="img-fluid w-100" src={product?.images[0]} alt="" style={{ width: "90px", height: "220px" }} />
                                        )}
                                        <div class="product-action">
                                            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                                            <a class="btn btn-outline-dark btn-square" onClick={()=>navigate(`/shop-detail/${product._id}`)}><i class="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                    <div class="text-center py-4">
                                        <a class="h6 text-decoration-none text-truncate" href="">{product?.name.slice(0, 20) + '...' || "Product Name Goes Here"}</a>
                                        <div class="d-flex align-items-center justify-content-center mt-2">
                                            <h5>{product?.price || "$123.00"}</h5>
                                            <h6 class="text-muted ml-2">
                                                <del>{product?.originalPrice || "$123.00"}</del>
                                            </h6>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-center mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <small key={i} className={`fa ${i < product?.rating ? 'fa-star text-primary' : 'fa-star-half-alt text-primary'} mr-1`}></small>
                                            ))}
                                            {/* Display all reviews */}
                                            <small>
                                                {product?.reviews?.map((review, index) => (
                                                    <span key={index}>{review.comment} </span>
                                                ))}
                                            </small>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </>
    )
}

export default Products
