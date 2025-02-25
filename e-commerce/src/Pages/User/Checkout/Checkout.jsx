import React, { useState } from 'react'
import { useUserApiContext } from '../../../Context/UserContext/UserApiContext'
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa';

const Checkout = () => {
    const [billingMethod, setBillingMethod] = useState(false)
    const { cart, handlePlaceOrder, setIsBillingSaved, isBillingSaved, setSelectedPaymentMethod, selectedPaymentMethod } = useUserApiContext();
    const subtotal = cart?.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shipping = 10; // Example shipping cost
    const total = subtotal + shipping;

    // Manage form values
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address1: '',
        address2: '',
        country: 'United States',
        city: '',
        state: '',
        zipCode: ''
    });

    // State to manage whether the billing details are saved

    // Handle form changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({
            ...billingDetails,
            [name]: value
        });
    };

    // Handle save billing details
    const handleSaveBilling = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))?._id;
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/checkout/${userId}`, billingDetails, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            if (response.status === 201) {
                toast.success('Billing details saved successfully!');
                setIsBillingSaved(response.data.billing);
                setBillingMethod(true);
            }


        } catch (error) {
            toast.error(error.response?.data?.message);

        }

    };

    const style = {
        color: 'black'
    }







    return (
        <>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#">Home</a>
                            <a className="breadcrumb-item text-dark" href="#">Shop</a>
                            <span className="breadcrumb-item active">Checkout</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Checkout start here */}

            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>First Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="firstName"
                                        value={billingDetails.firstName}
                                        onChange={handleInputChange}
                                        placeholder="John"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Last Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="lastName"
                                        value={billingDetails.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Doe"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        value={billingDetails.email}
                                        onChange={handleInputChange}
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="mobile"
                                        value={billingDetails.mobile}
                                        onChange={handleInputChange}
                                        placeholder="+123 456 789"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Address Line 1</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="address1"
                                        value={billingDetails.address1}
                                        onChange={handleInputChange}
                                        placeholder="123 Street"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Address Line 2</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="address2"
                                        value={billingDetails.address2}
                                        onChange={handleInputChange}
                                        placeholder="Apt 1"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Country</label>
                                    <select
                                        className="custom-select"
                                        name="country"
                                        value={billingDetails.country}
                                        onChange={handleInputChange}
                                    >
                                        <option selected>United States</option>
                                        <option>Afghanistan</option>
                                        <option>Albania</option>
                                        <option>Algeria</option>
                                    </select>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>City</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="city"
                                        value={billingDetails.city}
                                        onChange={handleInputChange}
                                        placeholder="New York"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>State</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="state"
                                        value={billingDetails.state}
                                        onChange={handleInputChange}
                                        placeholder="New York"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>ZIP Code</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="zipCode"
                                        value={billingDetails.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                    />
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={handleSaveBilling}>
                                Save Billing Details
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom">
                                <h6 className="mb-3">Products</h6>
                                {cart?.items.map((item) => {
                                    const { product, quantity } = item;
                                    const totalPrice = product.price * quantity;

                                    return (
                                        <div key={item._id} className="d-flex justify-content-between">
                                            <p style={style}>{product.name}</p>
                                            <p style={style}>${totalPrice}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-bottom pt-3 pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>${subtotal}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">${shipping}</h6>
                                </div>
                            </div>

                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>
                                        <FaRupeeSign />
                                        {Number(total) > 0 ? Number(total) : 0} 
                                    </h5>

                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                            <div className="bg-light p-30">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            name="payment"
                                            value={'paypal'}
                                            id="paypal"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            disabled={!billingMethod}

                                        />
                                        <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            value={'razorpay'}
                                            className="custom-control-input"
                                            name="payment"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            id="directcheck"
                                            disabled={!billingMethod}

                                        />
                                        <label className="custom-control-label" htmlFor="directcheck">Rezorpay</label>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-block btn-primary font-weight-bold py-3"
                                    disabled={cart?.length <= 0}
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Checkout;
