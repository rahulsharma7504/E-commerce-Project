import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminProducts.module.css'; // Import the CSS module
import { useProduct } from '../../Context/AdminContext/Management/ProductsManageContext';
import { useCategory } from '../../Context/AdminContext/CategoryManageContext';

const ProductsPage = () => {
  const { products, setProducts, updateProduct, deleteProduct } = useProduct();
  const { categories } = useCategory();

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for editing a product
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: 'In Stock' });
  const [editProduct, setEditProduct] = useState({ id: '', name: '', category: '', price: '', stock: '' });
  const [filteredCategory, setFilteredCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products by category and search term
  const filterProducts = () => {
    let filtered = products;

    if (filteredCategory) {
      // Ensure to filter using _id to match the category of the product
      filtered = filtered.filter(product => product.category._id === filteredCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filtered;
  };

  return (
    <Container fluid className={styles.productsContainer}>
      <Row className="mb-4">
        {/* Search and Filter Section */}
        <Col md={6} sm={12} className="mb-3">
          <InputGroup>
            <FormControl
              placeholder="Search by product name"
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
              <FaFilter /> Filter by Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {categories && categories.map(category => (
                <Dropdown.Item key={category._id} onClick={() => setFilteredCategory(category._id)}>
                  {category.name} {/* Set the category name here */}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Product List Table */}
      <Row>
        <Col sm={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Products List</Card.Title>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Color</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterProducts().map((product, index) => {
                    return (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.category.name}</td> {/* Display the category name */}
                        <td>${product.price}</td>
                        <td>{product.color}</td>
                        <td>
                          <Button variant="danger" onClick={() => deleteProduct(product._id)}>
                            <FaTrash /> Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};




export default ProductsPage;
