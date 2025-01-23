import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserApiContext } from '../../../Context/UserContext/UserApiContext'
import { FaRupeeSign } from 'react-icons/fa';

const Cart = () => {
    const { cart, deleteItemFromCart } = useUserApiContext();
    const navigate = useNavigate()
    return (
        <>
            <div class="container-fluid">
                <div class="row px-xl-5">
                    <div class="col-12">
                        <nav class="breadcrumb bg-light mb-30">
                            <a class="breadcrumb-item text-dark" href="#">Home</a>
                            <a class="breadcrumb-item text-dark" href="#">Shop</a>
                            <span class="breadcrumb-item active">Shopping Cart</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Shopping Cart here  */}



            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {cart?.items.map((item, index) => {
                                    const product = item.product;
                                    const totalItemPrice = product.price * item.quantity; // Calculate total for this item
                                    return (
                                        <tr key={index}>
                                            <td className="align-middle">

                                                {product.name.slice(0, 20) + ' ...'}
                                            </td>
                                            <td className="align-middle"><FaRupeeSign />{product.price}</td>
                                            <td className="align-middle">
                                                <div className="input-group quantity mx-auto" style={{ width: "100px" }}>

                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm bg-secondary border-0 text-center"
                                                        value={item.quantity} // Display the cart quantity
                                                        readOnly
                                                    />

                                                </div>
                                            </td>
                                            <td className="align-middle"><FaRupeeSign />{totalItemPrice}</td>
                                            <td className="align-middle">
                                                <button className="btn btn-sm btn-danger" onClick={() => deleteItemFromCart(item.product._id)}>
                                                    <i className="fa fa-times"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-30" action="">
                            <div className="input-group">
                                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6><FaRupeeSign />{cart?.totalPrice}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium"><FaRupeeSign />10</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5><FaRupeeSign />{cart?.totalPrice + 10}</h5>
                                </div>
                                <button
                                    className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                                    onClick={() => navigate('/shop/checkout')}
                                >
                                    Proceed To Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Cart
