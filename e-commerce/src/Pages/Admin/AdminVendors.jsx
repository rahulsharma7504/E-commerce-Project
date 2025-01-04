import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminVendors.module.css'; // Import your custom styles
import { useVendor } from '../../Context/AdminContext/Management/VendorManageContext';

import VendorUpdateModel from '../../Components/Footer/VendorUpdateModel'
import LoadingPage from './../../Components/Loading/Loading';

const AdminVendorsPage = () => {
  const { vendors, createVendor, updateVendor, deleteVendor, loading } = useVendor();
  const [showModal, setShowModal] = useState(false);
  const [vendorData, setVendorData] = useState(null); // To store the vendor data when editing

  const handleModalClose = () => setShowModal(false);

  const handleModalShow = (vendor = null) => {
    setVendorData(vendor); // Pass vendor data if editing
    setShowModal(true);
  };



  return (
    <>
      {
        loading ? (
          <LoadingPage />
        ) : (
          <Container fluid>
            <Row className="mb-4">
              <Col md={12} className="text-center">
                <h1 className="text-yellow"><FaUsers /> Vendors Management</h1>
              </Col>
            </Row>

            {/* Vendor Table */}
            <Row className="mb-4">
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <Button variant="success" onClick={() => handleModalShow()}>
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
                        {vendors?.map((vendor, index) => (
                          <tr key={vendor._id}>
                            <td>{index + 1}</td>
                            <td>{vendor?.user?.name}</td>
                            <td>{vendor?.user?.email}</td>
                            <td>{vendor?.storeName}</td>
                            <td>
                              <Button variant="warning" onClick={() => handleModalShow(vendor)}>
                                <FaEdit /> Edit
                              </Button>{' '}
                              <Button variant="danger" onClick={() => deleteVendor(vendor.user?._id)}>
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

            {/* Vendor Modal for Adding/Editing */}
            <VendorUpdateModel
              show={showModal}
              onHide={handleModalClose}
              vendorData={vendorData}
              createVendor={createVendor}
              updateVendor={updateVendor}
            />
          </Container>
        )
      }

    </>
  );
};

export default AdminVendorsPage;
