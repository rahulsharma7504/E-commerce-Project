import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus, FaRegEye } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/A_AddProduct.module.css'; // Import the CSS module
import { useCategory } from './../../Context/AdminContext/CategoryManageContext';
import { useVendor } from './../../Context/AdminContext/Management/VendorManageContext';
const AddProductForm = () => {
    const { vendors } = useVendor();
    const { categories } = useCategory();
    // State to hold form data and images
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [color, setColor] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [vendorId, setVendorId] = useState(null);
    const [images, setImages] = useState([]);
    const [showImagePreview, setShowImagePreview] = useState(false);

    // Sample dynamic data for categories and vendors (replace with actual API calls)


    // Handle the form submission
    const handleAddProduct = () => {
        const newProduct = {
            name: productName,
            description,
            price,
            stockQuantity,
            color,
            categoryName,
            vendorId,
            images,
        };

        console.log('Product Added:', newProduct);
        // Reset form after submission
        setProductName('');
        setDescription('');
        setPrice('');
        setStockQuantity('');
        setColor('');
        setCategoryName('');
        setVendorId('');
        setImages([]);
        setShowImagePreview(false);
    };

    // Handle image file selection
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
        setShowImagePreview(true);
    };

    return (
        <Container fluid className={styles.container}>
            <Row>
                {/* Left Column */}
                <Col xs={12} md={6}>
                    <h3 className="text-center mb-4">Add Product</h3>
                    {/* Left Column Inputs */}
                    <Row>
                        <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter product description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter product price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="stockQuantity">
                                <Form.Label>Stock Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter stock quantity"
                                    value={stockQuantity}
                                    onChange={(e) => setStockQuantity(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>

                {/* Right Column */}
                <Col xs={12} md={6} className='mt-3'>
                    <Row className='mt-5'>
                        <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="color">
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="categoryName">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="vendorId">
                                <Form.Label>Vendor ID</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={vendorId}
                                    onChange={(e) => setVendorId(e.target.value)}
                                >
                                    <option value="">Select Vendor</option>
                                    {vendors.map((vendor, index) => (
                                        <option key={index} value={vendor._id}>
                                            {vendor._id}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="images">
                                <Form.Label>Product Images</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="file"
                                        name='images'
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                    <Button variant="outline-secondary" onClick={() => setShowImagePreview(!showImagePreview)}>
                                        <FaRegEye />
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Image Preview */}


                    {/* Submit Button */}

                </Col>
                <Button variant="primary" onClick={handleAddProduct} className="w-100">
                    <FaPlus /> Add Product
                </Button>
                {showImagePreview && (
                    <div className="mt-2">
                        <h5>Image Preview:</h5>
                        <div className="d-flex flex-wrap">
                            {images.map((image, index) => (
                                <div key={index} className="m-2">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Product image ${index + 1}`}
                                        className={styles.imagePreview}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Row>
        </Container>
    );
};

export default AddProductForm;
