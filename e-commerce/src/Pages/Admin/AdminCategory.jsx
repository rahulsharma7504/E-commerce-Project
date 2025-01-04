import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, FormControl, InputGroup } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminCategory.module.css'; // Import the CSS module
import { useCategory } from '../../Context/AdminContext/CategoryManageContext';

const CategoryManagementPage = () => {
  const { categories, setCategories, createCategory, updateCategory, deleteCategory } = useCategory();
  
  // State variables
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState(null);  // Used for Edit
  const [searchTerm, setSearchTerm] = useState('');

  // Function to add or update category
  const handleCategorySubmit = () => {
    if (categoryId) {
      updateCategory(categoryId, categoryName);
    } else {
      createCategory(categoryName);
    }

    // Reset the form and close the modal
    setCategoryName('');
    setCategoryId(null);
    setShowModal(false);
  };

  // Filter categories based on search term
  const filterCategories = () => {
    if (searchTerm) {
      return categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return categories;
  };

  // Open modal in edit mode
  const handleEditCategory = (category) => {
    setCategoryId(category._id);
    setCategoryName(category.name);
    setShowModal(true);
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
          <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
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
                  {filterCategories().map((category) => (
                    <tr key={category.id}>
                      <td>{category?._id.length}</td>
                      <td>{category?.name}</td>
                      <td>
                        <Button variant="primary" className="me-2" onClick={() => handleEditCategory(category)}>
                          <FaEdit /> Edit
                        </Button>
                        <Button variant="danger" onClick={() => deleteCategory(category._id)}>
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

      {/* Add/Edit Category Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{categoryId ? 'Edit Category' : 'Add New Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCategorySubmit}>
            {categoryId ? 'Update Category' : 'Add Category'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CategoryManagementPage;
