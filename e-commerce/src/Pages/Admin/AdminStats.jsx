import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FaUser, FaChartLine, FaBoxOpen, FaShoppingCart, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from '../../Styles/AdminCSS/AdminStats.module.css'; // Import the CSS module

// Register chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, // Add this registration
  Title, 
  Tooltip, 
  Legend
);

const StatsPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userGrowthData, setUserGrowthData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Users Growth',
        data: [50, 120, 180, 250, 350],
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: true,
      },
    ],
  });

  const [productSalesData, setProductSalesData] = useState({
    labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
    datasets: [
      {
        label: 'Sales Volume',
        data: [1200, 1500, 800, 400, 900],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  });

  const [topVendorsData, setTopVendorsData] = useState({
    labels: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E'],
    datasets: [
      {
        label: 'Total Sales',
        data: [5000, 6000, 4000, 3000, 7000],
        backgroundColor: 'rgba(255,159,64,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
      },
    ],
  });

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const fetchStatsData = () => {
    // This is where you'd make an API call to fetch actual data for the selected range.
    // For now, we simulate the data by updating the charts.
  };

  return (
    <Container fluid className={styles.statsContainer}>
      <Row className="mb-4">
        {/* Stats Overview */}
        <Col md={3} sm={6} className="mb-3">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title><FaUser /> Total Users</Card.Title>
              <h3>1,200</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title><FaBoxOpen /> Total Products</Card.Title>
              <h3>350</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title><FaShoppingCart /> Total Sales</Card.Title>
              <h3>$20,500</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title><FaChartLine /> Revenue Growth</Card.Title>
              <h3>15%</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Date Range Filter */}
      <Row className="mb-4">
        <Col sm={12} md={6} className="mb-3">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Filter By Date</Card.Title>
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
              <Button variant="primary" className="mt-3" onClick={fetchStatsData}>
                <FaFilter /> Filter Data
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Growth Chart */}
      <Row className="mb-4">
        <Col sm={12} md={6} className="mb-3">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>User Growth</Card.Title>
              <Line data={userGrowthData} />
            </Card.Body>
          </Card>
        </Col>

        {/* Product Sales Chart */}
        <Col sm={12} md={6} className="mb-3">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Product Sales</Card.Title>
              <Bar data={productSalesData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Performing Vendors */}
      <Row className="mb-4">
        <Col sm={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Top Performing Vendors</Card.Title>
              <Bar data={topVendorsData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StatsPage;
