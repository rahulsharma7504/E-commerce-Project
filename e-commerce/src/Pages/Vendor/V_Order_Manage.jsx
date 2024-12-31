import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEdit, FaEye } from "react-icons/fa";
import styles from "../../Styles/VendorCSS/V_Order_Manage.module.css";

const VendorOrderManagementPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: "John Doe", totalAmount: 200, status: "Pending" },
    { id: 2, customerName: "Jane Smith", totalAmount: 350, status: "Shipped" },
    { id: 3, customerName: "Emily Johnson", totalAmount: 120, status: "Delivered" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setShowModal(true);
  };

  const handleChangeStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className={styles.ordersPage}>
      <h1 className={styles.title}>Vendor Order Management</h1>

      <div className={styles.tableContainer}>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.customerName}</td>
                <td>${order.totalAmount}</td>
                <td>
                  <span
                    className={`${styles.status} ${styles[order.status.toLowerCase()]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleViewOrder(order)}
                  >
                    <FaEye /> View
                  </button>
                  <button
                    className={styles.changeButton}
                    onClick={() => handleChangeStatus(order.id, "Shipped")}
                  >
                    <FaCheckCircle /> Ship
                  </button>
                  <button
                    className={styles.changeButton}
                    onClick={() => handleChangeStatus(order.id, "Delivered")}
                  >
                    <FaTimesCircle /> Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <OrderModal
          order={currentOrder}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const OrderModal = ({ order, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Order Details</h2>
        <div className={styles.orderDetails}>
          <p><strong>Customer Name:</strong> {order.customerName}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorOrderManagementPage;
