import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminProducts.module.css'; // Import the CSS module
import { useProduct } from '../../Context/AdminContext/Management/ProductsManageContext';

const ProductsPage = () => {
  const {products, setProducts, createProduct, getProducts, updateProduct, deleteProduct}=useProduct()
  

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for editing a product
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: 'In Stock' });
  const [editProduct, setEditProduct] = useState({ id: '', name: '', category: '', price: '', stock: '' });
  const [filteredCategory, setFilteredCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Add new product
  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setShowModal(false);
    setNewProduct({ name: '', category: '', price: '', stock: 'In Stock' });
  };

  // Edit product
  const handleEditProduct = () => {
    setProducts(products.map((product) => (product.id === editProduct.id ? editProduct : product)));
    setShowEditModal(false);
    setEditProduct({ id: '', name: '', category: '', price: '', stock: '' });
  };

  // Filter products by category
  const filterProducts = () => {
    let filtered = products;

    if (filteredCategory) {
      filtered = filtered.filter(product => product.category === filteredCategory);
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
              <Dropdown.Item onClick={() => setFilteredCategory('Electronics')}>Electronics</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilteredCategory('Home Appliances')}>Home Appliances</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilteredCategory('')}>Clear Filter</Dropdown.Item>
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
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterProducts().map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <Button variant="primary" className="me-2" onClick={() => { setEditProduct(product); setShowEditModal(true); }}>
                          <FaEdit /> Edit
                        </Button>
                        <Button variant="danger" onClick={() => setProducts(products.filter(p => p.id !== product.id))}>
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

   

     
    </Container>
  );
};

export default ProductsPage;
