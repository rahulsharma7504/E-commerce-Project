import React, { useState } from 'react';
import { Tab, Tabs, Table, Button } from 'react-bootstrap';
import { FaUserCircle, FaHistory, FaStar } from 'react-icons/fa';
import styles from '../../../Styles/User/profile.module.css'; // Assuming module CSS file
import { useUserApiContext } from '../../../Context/UserContext/UserApiContext';

const UserProfile = () => {
    const { user, setUser, orders, setOrders, reviews, setReviews } = useUserApiContext();
    const [key, setKey] = useState('profile');

    return (
        <div className={`container ${styles.profileContainer}`}>
            <h2 className={styles.title}>User Dashboard</h2>

            <Tabs
                id="user-profile-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className={styles.tabs}
            >
                {/* Profile Tab */}
                <Tab eventKey="profile" title={<><FaUserCircle /> Profile</>}>
                    <div className={styles.tabContent}>
                        <h3>Profile Information</h3>
                        <p><strong>Name:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Phone:</strong> {user?.phone}</p>
                        {/* <Button variant="primary" className={styles.updateButton}>Update Profile</Button> */}
                    </div>
                </Tab>

                {/* Purchase History Tab */}
                <Tab eventKey="history" title={<><FaHistory /> Purchase History</>}>
                    <div className={styles.tabContent}>
                        <h3>Your Orders</h3>
                        <Table striped bordered hover className={styles.table}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order, orderIndex) =>
                                    order.items.map((item, itemIndex) => (
                                        <tr key={`${order._id}-${itemIndex}`}>
                                            <td>{orderIndex + 1}</td> {/* Order number (index) */}
                                            <td>{item.productId.name}</td> {/* Product name */}
                                            <td>{item.quantity}</td> {/* Product quantity */}
                                            <td>${item.price}</td> {/* Price per item */}
                                            <td>{order.paymentStatus}</td> {/* Payment status */}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Tab>

                {/* Reviews Tab */}
                <Tab eventKey="reviews" title={<><FaStar /> Reviews</>}>
                    <div className={styles.tabContent}>
                        <h3>Your Reviews</h3>
                        {reviews?.length > 0 ? (
                            <ul className={styles.reviewsList}>
                                {reviews?.map((review) => (
                                    <li key={review._id} className={styles.reviewItem}>
                                        <strong>Product:</strong> {review.product.name} <br />
                                        <strong>Rating:</strong> {review.rating} Stars <br />
                                        <strong>Comment:</strong> {review.comment} <br />
                                        <strong>Reviewed On:</strong> {new Date(review.createdAt).toLocaleDateString()} {/* Date format */}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default UserProfile;
