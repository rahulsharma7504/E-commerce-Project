import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, FormControl, Pagination } from 'react-bootstrap';
import { FaSearch, FaUserEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminUsers.module.css'; // Import the CSS module
import { useUsers } from '../../Context/AdminContext/Management/UserManageContext';
import moment from 'moment'

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { users, setUsers, changeUserStatus, deleteUser } = useUsers();
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };



  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

  return (
    <Container fluid className={styles.userContainer}>
      <Row className="mb-4">
        <Col sm={12} md={6}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>User Management</Card.Title>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search Users"
                  aria-label="Search Users"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-secondary">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Table */}
      <Row className="mb-4">
        <Col sm={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Users List</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.status === 'Active' || user.status=== 'active' ? (
                          <span className="text-success">
                            <FaCheckCircle /> Active
                          </span>
                        ) : (
                          <span className="text-danger">
                            <FaTimesCircle /> Inactive
                          </span>
                        )}
                      </td>
                      <td>{moment(user.createdAt).format('DD-MM-YYYY')}</td>
                      <td>

                        <Button variant="danger" onClick={() => deleteUser(user._id)} className="me-2">
                          <FaTrash /> Delete
                        </Button>
                        {user.status === 'Active' || user.status==='active' ? (
                          <Button variant="secondary" onClick={() => changeUserStatus(user._id, 'inactive')}>
                            Deactivate
                          </Button>
                        ) : (
                          <Button variant="secondary" onClick={() => changeUserStatus(user._id, 'active')}  >
                            Activate
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <Pagination>
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : page)} />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item key={index} active={index + 1 === page} onClick={() => setPage(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setPage(page < totalPages ? page + 1 : page)} />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
