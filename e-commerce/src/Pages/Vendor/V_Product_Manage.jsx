import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../../Styles/VendorCSS/V_Product_Manage.module.css";
import { useCategory } from "../../Context/AdminContext/CategoryManageContext";
import { useVendorProduct } from "../../Context/VendorContext/VendorProductContext";
import LoadingPage from "../../Components/Loading/Loading";

const VendorProductsManagementPage = () => {
const {products,setProducts, addProduct, deleteProduct, loading} = useVendorProduct()
 
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

 
  const handleSaveProduct = (product) => {
    if (editProduct) {
      const updatedProducts = products.map((p) =>
        p._id === editProduct._id ? { ...p, ...product } : p
      );
      setProducts(updatedProducts);
    } else {
      setProducts([...products, { ...product, id: products.length + 1 }]);
    }
    setShowModal(false);
  };

  return (
    <>
        {loading && <LoadingPage/>}
        
    <div className={styles.productsPage}>
      <h1 className={styles.title}>Vendor Product Management</h1>
      <button className={styles.addButton} onClick={handleAddProduct}>
        <FaPlusCircle /> Add Product
      </button>

      <div className={styles.tableContainer}>
        <table className={styles.productsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditProduct(product)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteProduct(product._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => setShowModal(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
    </>
  );
};

const ProductModal = ({ product, onClose, onSave }) => {
const { addProduct, editProduct} = useVendorProduct()

  const { categories } = useCategory();
  const colors = [
    "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White",
    "Gray", "Cyan", "Magenta", "Maroon", "Olive", "Teal", "Navy", "Lime", "Indigo", "Gold",
    "Silver", "Beige", "Coral", "Turquoise", "Mint", "Violet", "Peach", "Crimson", "Lavender", "Aquamarine"
  ];

  const [formData, setFormData] = useState({
    productId: product? product._id : null,
    name: product ? product.name : "",
    price: product ? product.price : "",
    description: product ? product.description : "",
    stockQuantity: product ? product.stockQuantity : "",
    color: product ? product.color : "",
    categoryName: product ? product.name : "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.price || !formData.description || !formData.stockQuantity || !formData.color || !formData.categoryName) {
      alert("Please fill all fields.");
      return;
    }

    const updatedProduct = { ...formData, images };

    // Check if we are in Edit mode or Add mode based on if product is passed
    if (product) {
      // Edit existing product
      onSave(editProduct(updatedProduct));  // Call the save function with the updated data
    } else {
      // Add new product
      onSave(addProduct(updatedProduct));  // Call the save function with the updated data

    }

    // Close the 


  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product ? "Edit Product" : "Add Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock Quantity</Form.Label>
            <Form.Control
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Select name="color" value={formData.color} onChange={handleChange} required>
              <option value="">Select Color</option>
              {colors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryName"
              value={formData?.categoryName}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VendorProductsManagementPage;
