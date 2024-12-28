import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FaCalendarAlt, FaSearch, FaDollarSign } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from '../../Styles/AdminCSS/AdminRevenue.module.css'; // Import the CSS module

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenuePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [revenueData, setRevenueData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [1000, 1500, 1200, 1800, 2000],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  });

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // Placeholder function to simulate data fetching based on date range
  const fetchRevenueData = () => {
    // This is where you'd make an API call to fetch actual revenue data for the selected range.
    // For now, we simulate the revenue data.
    setRevenueData({
      labels: ['June', 'July', 'August', 'September', 'October'],
      datasets: [
        {
          label: 'Revenue ($)',
          data: [2500, 2200, 2400, 2100, 2600],
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
    });
  };

  return (
    <Container fluid className={styles.revenueContainer}>
      <Row className="mb-4">
        {/* Revenue Overview */}
        <Col md={4} sm={12} className="mb-3">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Revenue Overview</Card.Title>
              <h3><FaDollarSign /> $12,500</h3>
              <p>Total Revenue</p>
              <p><strong>Sales Count:</strong> 340</p>
              <p><strong>Orders:</strong> 300</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Date Range Filter */}
        <Col md={4} sm={12} className="mb-3">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Date Range</Card.Title>
              <InputGroup>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
              </InputGroup>
              <Button variant="primary" className="mt-3" onClick={fetchRevenueData}>
                <FaSearch /> Fetch Data
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Revenue Chart */}
      <Row className="mb-4">
        <Col sm={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Revenue Trend</Card.Title>
              <Line data={revenueData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Revenue Breakdown (optional) */}
      <Row>
        <Col sm={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Revenue Breakdown</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>By Category</Form.Label>
                  <Form.Control as="select">
                    <option>Electronics</option>
                    <option>Home Appliances</option>
                    <option>Fashion</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RevenuePage;
