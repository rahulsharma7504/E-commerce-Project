import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, FormControl, Pagination } from 'react-bootstrap';
import { FaSearch, FaUserEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styles from '../../Styles/AdminCSS/AdminUsers.module.css'; // Import the CSS module

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', status: 'Active', registrationDate: '2023-08-12' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', status: 'Inactive', registrationDate: '2023-06-21' },
    { id: 3, name: 'Robert Brown', email: 'robertb@example.com', status: 'Active', registrationDate: '2023-07-10' },
    // Add more users for demonstration...
  ]);
  
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeactivate = (userId) => {
    // Implement deactivation logic here
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'Inactive' } : user));
  };

  const handleDelete = (userId) => {
    // Implement delete logic here
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEdit = (userId) => {
    // Implement edit logic here
    alert('Edit user: ' + userId);
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
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.status === 'Active' ? (
                          <span className="text-success">
                            <FaCheckCircle /> Active
                          </span>
                        ) : (
                          <span className="text-danger">
                            <FaTimesCircle /> Inactive
                          </span>
                        )}
                      </td>
                      <td>{user.registrationDate}</td>
                      <td>
                        <Button variant="warning" onClick={() => handleEdit(user.id)} className="me-2">
                          <FaUserEdit /> Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(user.id)} className="me-2">
                          <FaTrash /> Delete
                        </Button>
                        {user.status === 'Active' ? (
                          <Button variant="secondary" onClick={() => handleDeactivate(user.id)}>
                            Deactivate
                          </Button>
                        ) : (
                          <Button variant="secondary" disabled>
                            Deactivated
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
