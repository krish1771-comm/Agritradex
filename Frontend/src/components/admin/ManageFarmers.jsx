import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEye, FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';
import Loader from '../common/Loader';

const ManageFarmers = () => {
  const [loading, setLoading] = useState(true);
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFarmers([
        {
          id: 1,
          name: 'Harpreet Singh',
          farmName: 'Singh Farms',
          email: 'harpreet@singhfarms.com',
          phone: '9876543210',
          location: 'Punjab',
          products: 24,
          status: 'verified',
          joinedDate: '2024-01-15',
          documents: 'aadhar.pdf'
        },
        {
          id: 2,
          name: 'Ramesh Patel',
          farmName: 'Patel Orchards',
          email: 'ramesh@patelorchards.com',
          phone: '9876543211',
          location: 'Maharashtra',
          products: 18,
          status: 'verified',
          joinedDate: '2024-02-01',
          documents: 'aadhar.pdf'
        },
        {
          id: 3,
          name: 'Krishna Reddy',
          farmName: 'Reddy Farms',
          email: 'krishna@reddyfarms.com',
          phone: '9876543212',
          location: 'Andhra Pradesh',
          products: 0,
          status: 'pending',
          joinedDate: '2024-03-10',
          documents: 'aadhar.pdf'
        },
        {
          id: 4,
          name: 'Gurdev Singh',
          farmName: 'Green Valley Farms',
          email: 'gurdev@greenvalley.com',
          phone: '9876543214',
          location: 'Punjab',
          products: 12,
          status: 'suspended',
          joinedDate: '2024-02-15',
          documents: 'aadhar.pdf'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...farmers];
    
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(f => f.status === filterStatus);
    }
    
    setFilteredFarmers(filtered);
  }, [searchTerm, filterStatus, farmers]);

  const handleVerify = (farmerId) => {
    setFarmers(farmers.map(f => 
      f.id === farmerId ? { ...f, status: 'verified' } : f
    ));
  };

  const handleSuspend = (farmerId) => {
    setFarmers(farmers.map(f => 
      f.id === farmerId ? { ...f, status: 'suspended' } : f
    ));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="py-5">
      <h1 className="display-6 fw-bold mb-4">Manage Farmers</h1>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={5}>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <FaSearch className="text-success" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by farm name, farmer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="suspended">Suspended</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Farm Name</th>
                <th>Farmer</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Products</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map(farmer => (
                <tr key={farmer.id}>
                  <td className="fw-bold">{farmer.farmName}</td>
                  <td>{farmer.name}</td>
                  <td>
                    <div>{farmer.email}</div>
                    <small className="text-muted">{farmer.phone}</small>
                  </td>
                  <td>{farmer.location}</td>
                  <td>{farmer.products}</td>
                  <td>
                    <Badge bg={
                      farmer.status === 'verified' ? 'success' :
                      farmer.status === 'pending' ? 'warning' : 'danger'
                    }>
                      {farmer.status}
                    </Badge>
                  </td>
                  <td>{farmer.joinedDate}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="outline-info" size="sm">
                        <FaEye />
                      </Button>
                      <Button variant="outline-warning" size="sm">
                        <FaFilePdf />
                      </Button>
                      {farmer.status === 'pending' && (
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleVerify(farmer.id)}
                        >
                          <FaCheck />
                        </Button>
                      )}
                      {farmer.status === 'verified' && (
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleSuspend(farmer.id)}
                        >
                          <FaTimes />
                        </Button>
                      )}
                    </div>
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

export default ManageFarmers;