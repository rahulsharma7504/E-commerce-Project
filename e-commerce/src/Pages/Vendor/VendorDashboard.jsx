import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { FaBox, FaListAlt, FaChartLine, FaShippingFast, FaMoneyBillWave, FaRupeeSign } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import styles from "../../Styles/VendorCSS/vendorDashboard.module.css";
import stylesa from "../../Styles/VendorCSS/Analystics.module.css";
import { useVendorProduct } from '../../Context/VendorContext/VendorProductContext';
const SalesPerformance = ({ salesData }) => {
  // Graph Data Preparation
  const labels = salesData.map((data) => new Date(data.createdAt).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Revenue',
        data: salesData.map((data) => data.totalAmount),
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Line data={data} />
  );
};

const VendorDashboard = () => {
  const { products, analyticsData , allOrders} = useVendorProduct();
  const graphData = [
    { name: "Total Revenue", value: analyticsData?.analytics?.totalRevenue || 0 },
    { name: "Total Sales", value: analyticsData?.analytics?.totalSales || 0 },
    { name: "Products Sold", value: analyticsData?.analytics?.totalProductsSold || 0 },
  ];
  return (
    <Container fluid className={styles.dashboardContainer}>
    {/* Stats Cards */}
    <Row>
      <Col md={4} sm={12} className={styles.cardColumn}>
        <Card className={styles.statCard}>
          <Card.Body>
            <FaBox className={styles.cardIcon} />
            <Card.Title>Products</Card.Title>
            <Card.Text>{products.length}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} sm={12} className={styles.cardColumn}>
        <Card className={styles.statCard}>
          <Card.Body>
            <FaListAlt className={styles.cardIcon} />
            <Card.Title>Orders</Card.Title>
            <Card.Text>{allOrders?.totalOrders || 0} Orders</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} sm={12} className={styles.cardColumn}>
        <Card className={styles.statCard}>
          <Card.Body>
            <FaMoneyBillWave className={styles.cardIcon} />
            <Card.Title>Sales</Card.Title>
            <Card.Text>
              <FaRupeeSign /> {analyticsData?.analytics?.totalRevenue || 0}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  
    {/* Sales Performance and Recent Orders */}
    <Row className="mt-4">
    <Col md={8} sm={12}>
      <Card className={styles.graphCard}>
        <Card.Body>
          <FaChartLine className={styles.cardIcon} />
          <Card.Title>Sales </Card.Title>
          <div className={styles.graphPlaceholder}>
            {analyticsData?.analytics ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>No sales data available</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>

      <Col md={4} sm={12}>
        <Card className={styles.ordersCard}>
          <Card.Body>
            <FaShippingFast className={styles.cardIcon} />
            <Card.Title>Recent Orders</Card.Title>
            <Table responsive>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData?.recentOrders?.length ? (
                  analyticsData.recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.orderId.slice(0,15)}</td>
                      <td>{order.paymentStatus}</td>
                      <td>
                        <FaRupeeSign /> {order.totalAmount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Recent Orders
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  
    {/* Button Row */}
    <Row className="mt-4">
      <Col className="text-center">
        <Button variant="primary" size="lg" className={styles.viewAllButton}>
          View All Orders
        </Button>
      </Col>
    </Row>
  </Container>
  
  );
};

export default VendorDashboard;
