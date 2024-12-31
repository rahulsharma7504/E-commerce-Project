import React, { useState } from "react";
import { FaSearch, FaTruck, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import styles from "../../Styles/VendorCSS/VendorOrders.module.css";


const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders = [
    { id: "#12345", customer: "John Doe", status: "Pending", date: "2024-01-01" },
    { id: "#12346", customer: "Jane Smith", status: "Shipped", date: "2024-01-02" },
    { id: "#12347", customer: "Sam Wilson", status: "Delivered", date: "2024-01-03" },
  ];

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.title}>Orders Management</h1>
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <FaHourglassHalf className={styles.icon} />
          <h2>Pending Orders</h2>
          <p>12</p>
        </div>
        <div className={styles.summaryCard}>
          <FaTruck className={styles.icon} />
          <h2>Shipped Orders</h2>
          <p>8</p>
        </div>
        <div className={styles.summaryCard}>
          <FaCheckCircle className={styles.icon} />
          <h2>Delivered Orders</h2>
          <p>15</p>
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
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td
                className={
                  order.status === "Pending"
                    ? styles.statusPending
                    : order.status === "Shipped"
                    ? styles.statusShipped
                    : styles.statusDelivered
                }
              >
                {order.status}
              </td>
              <td>{order.date}</td>
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
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
