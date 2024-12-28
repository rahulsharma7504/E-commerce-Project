import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Dropdown, FormControl, InputGroup, Modal, Form } from 'react-bootstrap';
import { FaSearch, FaFilter, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminOrder.module.css'; // Import the CSS module

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, user: 'John Smith', status: 'Pending', date: '2024-12-25', amount: '$250' },
    { id: 2, user: 'Sarah Lee', status: 'Shipped', date: '2024-12-24', amount: '$199' },
    { id: 3, user: 'Mike Ross', status: 'Cancelled', date: '2024-12-23', amount: '$350' },
    { id: 4, user: 'Jessica Lee', status: 'Pending', date: '2024-12-22', amount: '$120' },
    // Add more sample data here
  ]);

  const [filteredStatus, setFilteredStatus] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState({ id: '', user: '', status: '', date: '', amount: '' });

  // Function to filter orders based on status
  const filterOrders = () => {
    if (!filteredStatus) return orders;
    return orders.filter(order => order.status === filteredStatus);
  };

  // Open the Edit Modal and pre-fill with order data
  const openEditModal = (order) => {
    setEditOrder(order);
    setShowEditModal(true);
  };

  // Handle the Edit Order submission
  const handleEditOrder = () => {
    setOrders(orders.map(order => (order.id === editOrder.id ? editOrder : order)));
    setShowEditModal(false);
    setEditOrder({ id: '', user: '', status: '', date: '', amount: '' });
  };

  return (
    <Container fluid className={styles.ordersContainer}>
      <Row className="mb-4">
        {/* Order Filters Section */}
        <Col md={6} sm={12} className="mb-3">
          <InputGroup>
            <FormControl placeholder="Search by user or order ID" />
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
              <Dropdown.Item onClick={() => setFilteredStatus('Pending')}>Pending</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilteredStatus('Shipped')}>Shipped</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilteredStatus('Cancelled')}>Cancelled</Dropdown.Item>
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
                    <tr key={order.id}>
                      <td>{`#${order.id}`}</td>
                      <td>{order.user}</td>
                      <td>
                        <Button variant={order.status === 'Pending' ? 'warning' : order.status === 'Shipped' ? 'success' : 'danger'}>
                          {order.status}
                        </Button>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.amount}</td>
                      <td>
                        <Button variant="primary" className="me-2" onClick={() => openEditModal(order)}>
                          <FaEdit /> Edit
                        </Button>
                        <Button variant="danger" onClick={() => setOrders(orders.filter(o => o.id !== order.id))}>
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

      {/* Pagination (this is a placeholder for future implementation) */}
      <Row className="justify-content-center mt-4">
        <Col md={6} className="text-center">
          <Button variant="outline-primary" className="me-2">Previous</Button>
          <Button variant="outline-primary">Next</Button>
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
                value={editOrder.user}
                onChange={(e) => setEditOrder({ ...editOrder, user: e.target.value })}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={editOrder.status}
                onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
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
                value={editOrder.amount}
                onChange={(e) => setEditOrder({ ...editOrder, amount: e.target.value })}
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
