import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { FaUser, FaStore, FaDollarSign, FaClipboardList, FaChartLine } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminDashboard.module.css'; // Import the CSS module

import { useUsers } from '../../Context/AdminContext/Management/UserManageContext';
import { useVendor } from '../../Context/AdminContext/Management/VendorManageContext';
const Admin = () => {

  const { users } = useUsers();
  const { vendors } = useVendor();


  return (
    <Container fluid className={styles.dashboardContainer}>
      <Row className="mb-4">
        {/* Overview Section */}
        <Col lg={3} sm={6} className="mb-4">
          <Card className={styles.card}>
            <Card.Body>
              <div className={styles.cardIcon}>
                <FaUser />
              </div>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className={styles.cardText}>{users.length}</Card.Text>
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
              <Card.Text className={styles.cardText}>{vendors.length}</Card.Text>
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
              <Card.Text className={styles.cardText}>$50,000</Card.Text>
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
              <Card.Text className={styles.cardText}>87</Card.Text>
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
                {/* A sample bar chart or sales chart could go here */}
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
                <li>New user registered: John Doe</li>
                <li>New product added: Wireless Headphones</li>
                <li>Order #1234 shipped</li>
                <li>Vendor registration approved: VendorX</li>
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
