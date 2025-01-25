import React, { useState } from "react";
import { FaSearch, FaTruck, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import styles from "../../Styles/VendorCSS/VendorOrders.module.css";

import { useVendorProduct } from '../../Context/VendorContext/VendorProductContext';
import LoadingPage from "../../Components/Loading/Loading";

const OrdersPage = () => {
  const { allOrders ,loading} = useVendorProduct();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
<>
    {loading && <LoadingPage/>}

    <div className={styles.ordersContainer}>
      <h1 className={styles.title}>Orders Management</h1>
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <FaHourglassHalf className={styles.icon} />
          <h2>Pending Orders</h2>
          <p>{allOrders?.totalPendingOrders || 0}</p>
        </div>
        <div className={styles.summaryCard}>
          <FaCheckCircle className={styles.icon} />
          <h2>Completed Orders</h2>
          <p>{allOrders?.totalCompletedOrders || 0}</p>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search orders by ID, customer, or status..."
          className={styles.searchInput}
        />
      </div>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allOrders?.orders?.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.userName}</td>
              <td
                className={
                  order.status === "pending"
                    ? styles.statusPending
                    : styles.statusCompleted
                }
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>
                <button
                  className={styles.actionButton}
                  onClick={() => openModal(order)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Customer:</strong> {selectedOrder.userName}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
            <h3>Items:</h3>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  <strong>Product ID:</strong> {item.productId},{" "}
                  <strong>Quantity:</strong> {item.quantity},{" "}
                  <strong>Price:</strong> ${item.price}
                </li>
              ))}
            </ul>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};


export default OrdersPage;
