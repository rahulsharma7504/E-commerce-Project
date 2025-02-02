import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Dropdown, FormControl, InputGroup, Modal, Form } from 'react-bootstrap';
import { FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';  // Make sure axios is installed for API calls
import styles from '../../Styles/AdminCSS/AdminOrder.module.css';  // Import the CSS module
import { useAdminDashBoard } from '../../Context/AdminContext/DashboardStats';
const OrdersPage = () => {
  const { adminStats } = useAdminDashBoard();
  const [ordersData, setOrdersData] = useState({
    totalSales: 0,
    totalPendingOrders: 0,
    orders: [],
    newUsers: 0,
    newProducts: 0,
    newOrders: 0,
    newVendors: 0,
  });

  const [filteredStatus, setFilteredStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState({ id: '', user: '', status: '', date: '', amount: '' });

  // Fetch API data
  useEffect(() => {
   if(adminStats){
    setOrdersData(adminStats)
   }
  }, [adminStats]);

  // Filter Orders based on status and search term
  const filterOrders = () => {
    let filteredOrders = ordersData.orders;

    // Filter by status
    if (filteredStatus) {
      filteredOrders = filteredOrders.filter(order => order.orderStatus === filteredStatus);
    }

    // Filter by search term (user or order ID)
    if (searchTerm) {
      filteredOrders = filteredOrders.filter(order => 
        order.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.orderId.toString().includes(searchTerm)
      );
    }

    return filteredOrders;
  };

  // Open the Edit Modal and pre-fill with order data
  const openEditModal = (order) => {
    setEditOrder(order);
    setShowEditModal(true);
  };

  // Handle the Edit Order submission
  const handleEditOrder = () => {
    setOrdersData({
      ...ordersData,
      orders: ordersData.orders.map(order => (order.orderId === editOrder.orderId ? editOrder : order))
    });
    setShowEditModal(false);
    setEditOrder({ orderId: '', userName: '', orderStatus: '', date: '', totalAmount: '' });
  };

  // Handle delete order
  const handleDeleteOrder = (orderId) => {
    setOrdersData({
      ...ordersData,
      orders: ordersData.orders.filter(order => order.orderId !== orderId)
    });
  };

  return (
    <Container fluid className={styles.ordersContainer}>
      <Row className="mb-4">
        {/* Overview Section */}
        <Col lg={3} sm={6} className="mb-4">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text className={styles.cardText}>${ordersData.totalSales}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} sm={6} className="mb-4">
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Total Pending Orders</Card.Title>
              <Card.Text className={styles.cardText}>{ordersData.totalPendingOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Order Filters Section */}
      <Row className="mb-4">
        <Col md={6} sm={12} className="mb-3">
          <InputGroup>
            <FormControl 
              placeholder="Search by user or order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
        <Col md={6} sm={12} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FaFilter /> Filter by Status
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilteredStatus('pending')}>Pending</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilteredStatus('shipped')}>Shipped</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilteredStatus('cancelled')}>Cancelled</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilteredStatus('completed')}>Completed</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilteredStatus('')}>Clear Filter</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Orders Table */}
      <Row>
        <Col sm={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Orders List</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterOrders().map(order => (
                    <tr key={order.orderId}>
                      <td>{`#${order.orderId}`}</td>
                      <td>{order.userName}</td>
                      <td>
                        <Button variant={order.orderStatus === 'pending' ? 'warning' : order.orderStatus === 'shipped' ? 'success' : 'danger'}>
                          {order.orderStatus}
                        </Button>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>${order.totalAmount}</td>
                      <td>
                        <Button variant="primary" className="me-2" onClick={() => openEditModal(order)}>
                          <FaEdit /> Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteOrder(order.orderId)}>
                          <FaTrash /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Order Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Control
                type="text"
                value={editOrder.userName}
                onChange={(e) => setEditOrder({ ...editOrder, userName: e.target.value })}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={editOrder.orderStatus}
                onChange={(e) => setEditOrder({ ...editOrder, orderStatus: e.target.value })}
              >
                <option>Pending</option>
                <option>Shipped</option>
                <option>Cancelled</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                value={editOrder.date}
                onChange={(e) => setEditOrder({ ...editOrder, date: e.target.value })}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={editOrder.totalAmount}
                onChange={(e) => setEditOrder({ ...editOrder, totalAmount: e.target.value })}
                disabled
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditOrder}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrdersPage;
