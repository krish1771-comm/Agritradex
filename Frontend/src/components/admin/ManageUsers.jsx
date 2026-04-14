import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../common/Loader';

const ManageUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'buyer', status: 'active', joined: '2024-01-15' },
        { id: 2, name: 'Harpreet Singh', email: 'harpreet@example.com', role: 'farmer', status: 'active', joined: '2024-01-20' },
        { id: 3, name: 'Priya Sharma', email: 'priya@example.com', role: 'buyer', status: 'active', joined: '2024-02-01' },
        { id: 4, name: 'Amit Patel', email: 'amit@example.com', role: 'farmer', status: 'pending', joined: '2024-02-10' },
        { id: 5, name: 'Sunita Reddy', email: 'sunita@example.com', role: 'buyer', status: 'inactive', joined: '2024-01-05' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loader />;

  return (
    <Container className="py-5">
      <h1 className="display-6 fw-bold mb-4">Manage Users</h1>
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="fw-bold">{user.name}</td>
                  <td>{user.email}</td>
                  <td><Badge bg={user.role === 'admin' ? 'danger' : user.role === 'farmer' ? 'success' : 'info'}>{user.role}</Badge></td>
                  <td><Badge bg={user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'secondary'}>{user.status}</Badge></td>
                  <td>{user.joined}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-1"><FaEdit /></Button>
                    <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageUsers;