import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEye, FaTruck, FaCheck } from 'react-icons/fa';
import Loader from '../common/Loader';

const AdminOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: '#ORD001',
          customer: 'Rajesh Kumar',
          farmer: 'Singh Farms',
          amount: 1240,
          items: 3,
          status: 'pending',
          date: '2024-03-10',
          payment: 'COD'
        },
        {
          id: '#ORD002',
          customer: 'Priya Sharma',
          farmer: 'Patel Orchards',
          amount: 860,
          items: 2,
          status: 'shipped',
          date: '2024-03-09',
          payment: 'Online'
        },
        {
          id: '#ORD003',
          customer: 'Amit Patel',
          farmer: 'Green Valley',
          amount: 2150,
          items: 5,
          status: 'delivered',
          date: '2024-03-08',
          payment: 'Online'
        },
        {
          id: '#ORD004',
          customer: 'Sunita Reddy',
          farmer: 'Spice Gardens',
          amount: 450,
          items: 1,
          status: 'pending',
          date: '2024-03-08',
          payment: 'COD'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...orders];
    
    if (searchTerm) {
      filtered = filtered.filter(o => 
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.farmer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(o => o.status === filterStatus);
    }
    
    setFilteredOrders(filtered);
  }, [searchTerm, filterStatus, orders]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="py-5">
      <h1 className="display-6 fw-bold mb-4">Manage Orders</h1>

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
                  placeholder="Search by order ID, customer, or farmer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
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
                <th>Order ID</th>
                <th>Customer</th>
                <th>Farmer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="fw-bold">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.farmer}</td>
                  <td>{order.items}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.payment}</td>
                  <td>
                    <Badge bg={
                      order.status === 'delivered' ? 'success' :
                      order.status === 'shipped' ? 'info' : 'warning'
                    }>
                      {order.status}
                    </Badge>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="outline-info" size="sm">
                        <FaEye />
                      </Button>
                      {order.status === 'pending' && (
                        <Button variant="outline-primary" size="sm">
                          <FaTruck />
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button variant="outline-success" size="sm">
                          <FaCheck />
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

// ***** THIS LINE IS CRITICAL - MAKE SURE IT'S THERE *****
export default AdminOrders;