import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminVendors.module.css'; // Import your custom styles

const AdminVendorsPage = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor A', email: 'vendora@example.com', totalSales: '$5000' },
    { id: 2, name: 'Vendor B', email: 'vendorb@example.com', totalSales: '$3000' },
    { id: 3, name: 'Vendor C', email: 'vendorc@example.com', totalSales: '$7000' },
    // Add more vendors here
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '',
    email: '',
    totalSales: '',
  });

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddVendor = () => {
    // Add vendor to the list
    setVendors((prev) => [
      ...prev,
      { id: vendors.length + 1, ...newVendor },
    ]);
    setShowModal(false);
    setNewVendor({ name: '', email: '', totalSales: '' }); // Reset form
  };

  const handleDeleteVendor = (id) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };

  const handleEditVendor = (id) => {
    const vendor = vendors.find((vendor) => vendor.id === id);
    setNewVendor(vendor); // Pre-fill the form with existing vendor details
    setShowModal(true);
  };

  return (
    <Container fluid className={styles.vendorsContainer}>
      <Row className="mb-4">
        <Col md={12} className="text-center">
          <h1 className="text-yellow"><FaUsers /> Vendors Management</h1>
        </Col>
      </Row>

      {/* Vendor Table */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Button variant="success" onClick={handleModalShow}>
                <FaPlus /> Add New Vendor
              </Button>

              {/* Vendor List Table */}
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vendor Name</th>
                    <th>Email</th>
                    <th>Total Sales</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>{vendor.id}</td>
                      <td>{vendor.name}</td>
                      <td>{vendor.email}</td>
                      <td>{vendor.totalSales}</td>
                      <td>
                        <Button variant="warning" onClick={() => handleEditVendor(vendor.id)}>
                          <FaEdit /> Edit
                        </Button>{' '}
                        <Button variant="danger" onClick={() => handleDeleteVendor(vendor.id)}>
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

      {/* Modal for Adding/Editing Vendor */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{newVendor.id ? 'Edit Vendor' : 'Add New Vendor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="vendorName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Vendor Name"
                name="name"
                value={newVendor.name}
                onChange={handleVendorChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="vendorEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Vendor Email"
                name="email"
                value={newVendor.email}
                onChange={handleVendorChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="vendorTotalSales" className="mt-3">
              <Form.Label>Total Sales</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Total Sales"
                name="totalSales"
                value={newVendor.totalSales}
                onChange={handleVendorChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddVendor}
          >
            {newVendor.id ? 'Update Vendor' : 'Add Vendor'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminVendorsPage;
