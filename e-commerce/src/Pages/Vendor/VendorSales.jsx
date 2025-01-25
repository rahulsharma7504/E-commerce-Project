import React, { useState } from "react";
import { FaChartLine, FaDollarSign, FaShoppingCart, FaCalendarAlt } from "react-icons/fa";
import styles from "../../Styles/VendorCSS/VendorSales.module.css";
import { useVendorProduct } from "../../Context/VendorContext/VendorProductContext";

const VendorSalesPage = () => {
  const { allSales } = useVendorProduct();  // Dynamic data from API
  const [salesData, setSalesData] = useState(allSales || []); // Initialize with API data

  
  // To handle empty or loading states
  if (!allSales) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.salesPage}>
      <h1 className={styles.title}>Vendor Sales Dashboard</h1>
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <FaDollarSign className={styles.icon} />
          <h2>Total Revenue</h2>
          <p>${allSales?.totalRevenue}</p>
        </div>
        <div className={styles.statCard}>
          <FaShoppingCart className={styles.icon} />
          <h2>Products Sold</h2>
          <p>{allSales?.totalProductsSold}</p>
        </div>
        <div className={styles.statCard}>
          <FaChartLine className={styles.icon} />
          <h2>Sales Growth</h2>
          <p>{`${allSales?.growth}%`} This Month</p>
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
            {allSales?.productDetailsFormatted?.map((sale, index) => (
              <tr key={index}>
                <td>{sale.productName}</td>
                <td>{sale.revenue}</td>
                <td>{sale.quantitySold}</td>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
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
