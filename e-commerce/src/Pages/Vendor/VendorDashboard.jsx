import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { FaBox, FaListAlt, FaChartLine, FaShippingFast, FaMoneyBillWave } from 'react-icons/fa'; // React Icons
import styles from "../../Styles/VendorCSS/vendorDashboard.module.css";

const VendorDashboard = () => {
  return (
    <Container fluid className={styles.dashboardContainer}>
      <Row>
        {/* Cards for key stats */}
        <Col md={4} sm={12} className={styles.cardColumn}>
          <Card className={styles.statCard}>
            <Card.Body>
              <FaBox className={styles.cardIcon} />
              <Card.Title>Products</Card.Title>
              <Card.Text>50 Products</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} className={styles.cardColumn}>
          <Card className={styles.statCard}>
            <Card.Body>
              <FaListAlt className={styles.cardIcon} />
              <Card.Title>Orders</Card.Title>
              <Card.Text>124 Orders</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} className={styles.cardColumn}>
          <Card className={styles.statCard}>
            <Card.Body>
              <FaMoneyBillWave className={styles.cardIcon} />
              <Card.Title>Sales</Card.Title>
              <Card.Text>$4,250</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Row for charts and stats */}
      <Row className="mt-4">
        <Col md={8} sm={12}>
          <Card className={styles.graphCard}>
            <Card.Body>
              <FaChartLine className={styles.cardIcon} />
              <Card.Title>Sales Performance</Card.Title>
              {/* Placeholder for graph */}
              <div className={styles.graphPlaceholder}>
                <p>Graph Here (Placeholder)</p>
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
                  <tr>
                    <td>#1245</td>
                    <td>Shipped</td>
                    <td>$150</td>
                  </tr>
                  <tr>
                    <td>#1246</td>
                    <td>Pending</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td>#1247</td>
                    <td>Delivered</td>
                    <td>$300</td>
                  </tr>
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
