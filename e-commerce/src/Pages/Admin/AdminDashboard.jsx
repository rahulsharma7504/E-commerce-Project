import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { FaUser, FaStore, FaDollarSign, FaClipboardList, FaChartLine } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminDashboard.module.css'; // Import the CSS module

import { useUsers } from '../../Context/AdminContext/Management/UserManageContext';
import { useVendor } from '../../Context/AdminContext/Management/VendorManageContext';
import { useAdminDashBoard } from '../../Context/AdminContext/DashboardStats';
const Admin = () => {
  const { fetchAdminStats, adminStats } = useAdminDashBoard();

  const { users } = useUsers();
  const { vendors } = useVendor();


  return (
    <Container fluid className={styles.dashboardContainer}>
      {/* Overview Section */}
      <Row className="mb-4">
        <Col lg={3} sm={6} className="mb-4">
          <Card className={styles.card}>
            <Card.Body>
              <div className={styles.cardIcon}>
                <FaUser />
              </div>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className={styles.cardText}>{adminStats?.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} sm={6} className="mb-4">
          <Card className={styles.card}>
            <Card.Body>
              <div className={styles.cardIcon}>
                <FaStore />
              </div>
              <Card.Title>Total Vendors</Card.Title>
              <Card.Text className={styles.cardText}>{adminStats?.totalVendors}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} sm={6} className="mb-4">
          <Card className={styles.card}>
            <Card.Body>
              <div className={styles.cardIcon}>
                <FaDollarSign />
              </div>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text className={styles.cardText}>${adminStats?.totalSales}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} sm={6} className="mb-4">
          <Card className={styles.card}>
            <Card.Body>
              <div className={styles.cardIcon}>
                <FaClipboardList />
              </div>
              <Card.Title>Pending Orders</Card.Title>
              <Card.Text className={styles.cardText}>{adminStats?.totalPendingOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Analytics Section */}
      <Row className="mb-4">
        <Col lg={8} sm={12} className="mb-4">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Sales Analytics</Card.Title>
              <div className={styles.chartContainer}>
                <FaChartLine className={styles.chartIcon} />
                <ProgressBar animated now={75} label="75%" variant="success" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} sm={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>
              <ul className={styles.activityList}>
                {/* Dynamically render recent activities */}
                {adminStats?.orders.map((order, index) => (
                  <li key={index}>
                    Order #{order.orderId} - Status: {order.orderStatus} - Amount: ${order.totalAmount}
                  </li>
                ))}
                {/* Add other recent activities if needed */}
                <li>New user registered: {adminStats?.newUsers} users</li>
                <li>New product added: {adminStats?.newProducts} products</li>
                <li>New orders placed: {adminStats?.newOrders} orders</li>
                <li>New vendors: {adminStats?.newVendors} vendors</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Latest Orders Section */}
      <Row>
        <Col sm={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Latest Orders</Card.Title>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1245</td>
                    <td>John Smith</td>
                    <td><Button variant="warning">Pending</Button></td>
                    <td>$250</td>
                  </tr>
                  <tr>
                    <td>#1246</td>
                    <td>Sarah Lee</td>
                    <td><Button variant="success">Shipped</Button></td>
                    <td>$199</td>
                  </tr>
                  <tr>
                    <td>#1247</td>
                    <td>Mike Ross</td>
                    <td><Button variant="danger">Cancelled</Button></td>
                    <td>$350</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
