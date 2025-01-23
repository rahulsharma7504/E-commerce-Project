import React, { useEffect, useState } from 'react'
import { useUserData } from '../../../Context/UserContext/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
const Shop = () => {
    const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [priceFilterValues, setPriceFilterValues] = useState([]);
    const [colorFilterValues, setColorFilterValues] = useState([]);
    const { allshopProducts, handleProductDetailsPage, handelPriceFilters, handleSort, setAllShopProducts, currentPage, setCurrentPage, totalPages, handelColorFilters, setTotalPages, fetchProducts } = useUserData();



    const categoryFilters = [
        {
            category: "Price",
            options: [
                { id: "price-all", label: "All Price", count: 1000 },
                { id: "price-1", label: "0 - 100", count: 150 },
                { id: "price-2", label: "100 - 500", count: 295 },
                { id: "price-3", label: "500 - 1000", count: 246 },
                { id: "price-4", label: "1000 - 100000", count: 145 },
                { id: "price-5", label: "20000+", count: 168 },
            ],
        }
    ];
    const colorFilter = [{
        category: "Color",
        options: [
            { id: "color-all", label: "All Colors", count: 1000 },
            { id: "color-1", label: "Red", count: 150 },
            { id: "color-2", label: "Blue", count: 295 },
            { id: "color-3", label: "Green", count: 246 },
            { id: "color-4", label: "Black", count: 145 },
            { id: "color-5", label: "White", count: 168 },
        ],
    }]

    const handlePriceCheckboxChange = (checked, label) => {
        // If the checkbox is checked, add the label to the filterValues state
        if (checked) {
            setPriceFilterValues(prevValues => {
                // Avoid adding the same value twice if it already exists
                return [...prevValues, label]; // Return existing state if the label is already in the list
            });
        } else {
            // If unchecked, remove the label from filterValues state
            setPriceFilterValues(prevValues => prevValues.filter(item => item !== label));
        }

        // Call the function to handle updated filters
    };

    const handleColorCheckboxChange = (checked, label) => {
        // If the checkbox is checked, add the label to the filterValues state
        if (checked) {
            setColorFilterValues(prevValues => {
                // Avoid adding the same value twice if it already exists
                return [...prevValues, label]; // Return existing state if the label is already in the list
            });
        } else {
            // If unchecked, remove the label from filterValues state
            setColorFilterValues(prevValues => prevValues.filter(item => item !== label));
        }

        // Call the function to handle updated filters
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            fetchProducts(pageNumber);
        }
    };

    useEffect(() => {
        handelPriceFilters(priceFilterValues);
        handelColorFilters(colorFilterValues);
    }, [priceFilterValues, colorFilterValues]); // This will trigger when filterValues change

    return (
        <>

            <div class="container-fluid">
                <div class="row px-xl-5">
                    <div className="col-lg-3 col-md-4">
                        {categoryFilters.map((filter, index) => (
                            <div key={index}>
                                <h5 className="section-title position-relative text-uppercase mb-3">
                                    <span className="bg-secondary pr-3">Filter by {filter.category}</span>
                                </h5>
                                <div className="bg-light p-4 mb-30">
                                    <form>
                                        {filter.options.map((option, index) => (
                                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={index}>
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={option.id}
                                                    onChange={(e) => handlePriceCheckboxChange(e.target.checked, option.label)}
                                                    defaultChecked={option.id === `${filter.category.toLowerCase()}-all`} // Make "All" checked by default
                                                />
                                                <label className="custom-control-label" htmlFor={option.id}>
                                                    {option.label}
                                                </label>
                                                <span className="badge border font-weight-normal">{option.count}</span>
                                            </div>
                                        ))}
                                    </form>
                                </div>
                            </div>
                        ))}
                        {/* Filter By Color */}

                        {colorFilter.map((filter, index) => (
                            <div key={index}>
                                <h5 className="section-title position-relative text-uppercase mb-3">
                                    <span className="bg-secondary pr-3">Filter by {filter.category}</span>
                                </h5>
                                <div className="bg-light p-4 mb-30">
                                    <form>
                                        {filter.options.map((option, index) => (
                                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={index}>
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={option.id}
                                                    onChange={(e) => handleColorCheckboxChange(e.target.checked, option.label)}
                                                    defaultChecked={option.id === `${filter.category.toLowerCase()}-all`} // Make "All" checked by default
                                                />
                                                <label className="custom-control-label" htmlFor={option.id}>
                                                    {option.label}
                                                </label>
                                                <span className="badge border font-weight-normal">{option.count}</span>
                                            </div>
                                        ))}
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>



                    <div class="col-lg-9 col-md-8">
                        <div class="row pb-3">
                            {/* PENDING WORK HERE  */}
                            <div class="col-12 pb-1">
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <div>
                                        <button class="btn btn-sm btn-light" type="button" id="grid-view">
                                            <i class="fa fa-th-large"></i>
                                        </button>
                                        <button class="btn btn-sm btn-light ml-2" type="button" id="list-view">
                                            <i class="fa fa-bars"></i>
                                        </button>
                                    </div>
                                    <div class="ml-2">
                                        <Dropdown className="btn btn-sm btn-light dropdown-toggle">
                                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                Sorting
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                                <Dropdown.Item onClick={() => handleSort('latest')}>Latest</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleSort('popularity')}>Popularity</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleSort('bestRating')}>Best Rating</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>

                            {allshopProducts ? (
                                allshopProducts.map((product) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={product._id}>
                                        <div className="product-item bg-light mb-4">
                                            <div className="product-img position-relative overflow-hidden">
                                                {product?.images && product?.images[0] && (
                                                    <img className="img-fluid img-round w-100" src={product?.images[0]} alt={product?.name} style={{ width: "90px", height: "220px" }} />
                                                )}

                                                <div className="product-action">
                                                    <a className="btn btn-outline-dark btn-square" href="#">
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>


                                                    <a className="btn btn-outline-dark btn-square" onClick={() =>navigate(`/shop-detail/${product._id}`) }>
                                                        <i className="fa fa-search" ></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="text-center py-4">
                                                <a className="h6 text-decoration-none text-truncate" href="#">
                                                    {product?.name}
                                                </a>
                                                <div className="d-flex align-items-center justify-content-center mt-2">
                                                    <h5>₹{product.price}</h5>
                                                    <h6 className="text-muted ml-2">
                                                        <del>₹{product.price + 1000}</del>
                                                    </h6>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center mb-1">
                                                    <small className="fa fa-star text-primary mr-1"></small>
                                                    <small className="fa fa-star text-primary mr-1"></small>
                                                    <small className="fa fa-star text-primary mr-1"></small>
                                                    <small className="fa fa-star text-primary mr-1"></small>
                                                    <small className="fa fa-star text-primary mr-1"></small>
                                                    <small>(99)</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}




                            <div class="col-12">
                                <nav>
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a className="page-link btn" onClick={() => handlePageChange(currentPage - 1)}>
                                                Previous
                                            </a>
                                        </li>

                                        {/* Pagination numbers */}
                                        {[...Array(totalPages).keys()].map((index) => (
                                            <li
                                                key={index + 1}
                                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                            >
                                                <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                                                    {index + 1}
                                                </a>
                                            </li>
                                        ))}

                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <a className="  btn page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Shop
