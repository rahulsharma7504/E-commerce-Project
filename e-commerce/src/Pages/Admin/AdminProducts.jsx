import React, { useState } from 'react';
import { Tab, Tabs, Container, Row, Col, Button, Form, Modal, Table } from 'react-bootstrap';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminProducts.module.css'; // Import the CSS module
import A_Product_Tab from './A_Product_Tab'; // Import the component for product list
import A_Product_Add_Modal from './A_Product_Add'; // Import the component for adding a new product modal
const ProductTabs = () => {
  const [key, setKey] = useState('products'); // State to manage active tab
  const [showAddModal, setShowAddModal] = useState(false); // State to handle modal visibility
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [products, setProducts] = useState([]); // Mock product data

  // Function to handle adding a new product
  const handleAddProduct = () => {
    const newProduct = { id: products.length + 1, name: productName, price: productPrice };
    setProducts([...products, newProduct]);
    setProductName('');
    setProductPrice('');
    setShowAddModal(false);
  };

  // Function to handle product deletion
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Tabs id="product-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            {/* Tab for Products List */}
            <Tab eventKey="products" title="Products">
              <A_Product_Tab/>
            </Tab>

            {/* Tab for Add Product */}
            <Tab eventKey="addProduct" title="Add Product">
              <A_Product_Add_Modal/>
             
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductTabs;
