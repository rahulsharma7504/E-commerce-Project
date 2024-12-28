import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminCategory.module.css'; // Import the CSS module

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Home Appliances' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Sports & Outdoors' },
    // More sample categories
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Function to add a new category
  const handleAddCategory = () => {
    setCategories([...categories, { id: categories.length + 1, name: newCategory }]);
    setShowAddModal(false);
    setNewCategory('');
  };

  // Filter categories based on search term
  const filterCategories = () => {
    if (searchTerm) {
      return categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return categories;
  };

  // Function to delete a category
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <Container fluid className={styles.categoryContainer}>
      <Row className="mb-4">
        {/* Search and Filter Section */}
        <Col md={6} sm={12} className="mb-3">
          <InputGroup>
            <FormControl
              placeholder="Search by category name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
        <Col md={6} sm={12} className="mb-3">
          <Button variant="success" onClick={() => setShowAddModal(true)} className="mb-3">
            <FaPlus /> Add Category
          </Button>
        </Col>
      </Row>

      {/* Category List Table */}
      <Row>
        <Col sm={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Categories List</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Category ID</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterCategories().map(category => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>
                        <Button variant="primary" className="me-2">
                          <FaEdit /> Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>
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

      {/* Add Category Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CategoryManagementPage;
