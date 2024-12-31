import React, { useState } from "react";
import { FaChartLine, FaDollarSign, FaShoppingCart, FaCalendarAlt } from "react-icons/fa";
import styles from "../../Styles/VendorCSS/VendorSales.module.css";

const VendorSalesPage = () => {
  const [salesData, setSalesData] = useState([
    { id: 1, product: "Wireless Headphones", revenue: 1500, quantity: 30, date: "2024-12-01" },
    { id: 2, product: "Smartphone", revenue: 5000, quantity: 10, date: "2024-12-02" },
    { id: 3, product: "Smart Watch", revenue: 2000, quantity: 20, date: "2024-12-03" },
  ]);

  const totalRevenue = salesData.reduce((acc, sale) => acc + sale.revenue, 0);
  const totalProductsSold = salesData.reduce((acc, sale) => acc + sale.quantity, 0);

  return (
    <div className={styles.salesPage}>
      <h1 className={styles.title}>Vendor Sales Dashboard</h1>
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <FaDollarSign className={styles.icon} />
          <h2>Total Revenue</h2>
          <p>${totalRevenue}</p>
        </div>
        <div className={styles.statCard}>
          <FaShoppingCart className={styles.icon} />
          <h2>Products Sold</h2>
          <p>{totalProductsSold}</p>
        </div>
        <div className={styles.statCard}>
          <FaChartLine className={styles.icon} />
          <h2>Sales Growth</h2>
          <p>+15% This Month</p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h2 className={styles.sectionTitle}>Sales Data</h2>
        <table className={styles.salesTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Revenue ($)</th>
              <th>Quantity Sold</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.product}</td>
                <td>{sale.revenue}</td>
                <td>{sale.quantity}</td>
                <td>{sale.date}</td>
                <td>
                  <button className={styles.viewButton}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorSalesPage;
