// VendorModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FaEdit, FaPlus } from 'react-icons/fa';

const VendorModal = ({ show, onHide, vendorData, createVendor, updateVendor }) => {
  const [vendor, setVendor] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    storeName: '',
    role: 'vendor',
  });

  // Effect to populate form if editing an existing vendor
  useEffect(() => {
    if (vendorData && vendorData._id) {
      setVendor({
        id: vendorData.user?._id,
        name: vendorData.user?.name,
        email: vendorData.user?.email,
        password: '', // Password is empty for edits, should not pre-fill
        phone: vendorData.user?.phone,
        storeName: vendorData?.storeName,
        role: vendorData.user?.role,
      });
    } else {
      setVendor({
        name: '',
        email: '',
        password: '',
        phone: '',
        storeName: '',
        role: 'vendor',
      });
    }
  }, [vendorData, show]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (create or update)
  const handleSubmit = () => {
    if (vendor.id) {
      // If there's an ID, update the vendor
      updateVendor(vendor.id, vendor);
    } else {
      // Otherwise, create a new vendor
      createVendor(vendor);
    }
    onHide(); // Close modal after submitting
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{vendor._id ? <FaEdit /> : <FaPlus />} {vendor._id ? 'Edit Vendor' : 'Add New Vendor'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Vendor Name */}
          <Form.Group controlId="vendorName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Vendor Name"
              name="name"
              value={vendor?.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Vendor Email */}
          <Form.Group controlId="vendorEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Vendor Email"
              name="email"
              value={vendor.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Vendor Phone */}
          <Form.Group controlId="vendorPhone" className="mt-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              value={vendor.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Vendor Password */}
          {!vendor.id && ( // Password field is only shown when adding a new vendor
            <Form.Group controlId="vendorPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={vendor.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          {/* Store Name */}
          <Form.Group controlId="vendorStoreName" className="mt-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Store Name"
              name="storeName"
              value={vendor.storeName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Role Selection */}
          <Form.Group controlId="vendorRole" className="mt-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={vendor.role || 'vendor'}
              onChange={handleChange}
              required
            >
              <option value="vendor">Vendor</option>
              {/* You can add more roles as needed */}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {vendor.id ? 'Update Vendor' : 'Add Vendor'} 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VendorModal;
