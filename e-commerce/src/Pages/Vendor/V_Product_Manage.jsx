import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import styles from "../../Styles/VendorCSS/V_Product_Manage.module.css";


const VendorProductsManagementPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", price: 150, description: "High-quality wireless headphones" },
    { id: 2, name: "Smartphone", price: 500, description: "Latest model smartphone" },
    { id: 3, name: "Smart Watch", price: 200, description: "Stylish and durable smart watch" },
  ]);
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

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSaveProduct = (product) => {
    if (editProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editProduct.id ? { ...p, ...product } : p
      );
      setProducts(updatedProducts);
    } else {
      setProducts([...products, { ...product, id: products.length + 1 }]);
    }
    setShowModal(false);
  };

  return (
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
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditProduct(product)}>
                    <FaEdit />
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteProduct(product.id)}>
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
  );
};

const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    price: product ? product.price : "",
    description: product ? product.description : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.modalActions}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorProductsManagementPage;
