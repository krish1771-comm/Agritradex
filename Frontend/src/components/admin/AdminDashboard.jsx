import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { FaUsers, FaBox, FaShoppingBag, FaRupeeSign, FaChartLine, FaEye } from 'react-icons/fa';
import Loader from '../common/Loader';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFarmers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingVerifications: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [pendingFarmers, setPendingFarmers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 1250,
        totalFarmers: 156,
        totalProducts: 432,
        totalOrders: 892,
        totalRevenue: 456780,
        pendingVerifications: 12
      });

      setRecentOrders([
        { id: '#ORD001', customer: 'Rajesh Kumar', amount: 1240, status: 'pending', date: '2024-03-10' },
        { id: '#ORD002', customer: 'Priya Sharma', amount: 860, status: 'shipped', date: '2024-03-09' },
        { id: '#ORD003', customer: 'Amit Patel', amount: 2150, status: 'delivered', date: '2024-03-08' },
        { id: '#ORD004', customer: 'Sunita Reddy', amount: 450, status: 'pending', date: '2024-03-08' },
      ]);

      setPendingFarmers([
        { id: 1, name: 'Harpreet Singh', farmName: 'Singh Farms', email: 'harpreet@example.com', appliedOn: '2024-03-10' },
        { id: 2, name: 'Ramesh Patel', farmName: 'Patel Orchards', email: 'ramesh@example.com', appliedOn: '2024-03-09' },
        { id: 3, name: 'Krishna Reddy', farmName: 'Reddy Farms', email: 'krishna@example.com', appliedOn: '2024-03-08' },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loader />;

  return (
    <Container className="py-5">
      <h1 className="display-6 fw-bold mb-4">Admin Dashboard</h1>

      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div><p className="text-muted small mb-1">Total Users</p><h3 className="fw-bold mb-0">{stats.totalUsers}</h3><small className="text-success">Farmers: {stats.totalFarmers}</small></div>
                <div className="bg-primary bg-opacity-10 rounded-circle p-3"><FaUsers size={24} className="text-primary" /></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div><p className="text-muted small mb-1">Total Products</p><h3 className="fw-bold mb-0">{stats.totalProducts}</h3></div>
                <div className="bg-success bg-opacity-10 rounded-circle p-3"><FaBox size={24} className="text-success" /></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div><p className="text-muted small mb-1">Total Orders</p><h3 className="fw-bold mb-0">{stats.totalOrders}</h3></div>
                <div className="bg-warning bg-opacity-10 rounded-circle p-3"><FaShoppingBag size={24} className="text-warning" /></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div><p className="text-muted small mb-1">Total Revenue</p><h3 className="fw-bold mb-0">₹{stats.totalRevenue.toLocaleString()}</h3></div>
                <div className="bg-info bg-opacity-10 rounded-circle p-3"><FaRupeeSign size={24} className="text-info" /></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div><p className="text-muted small mb-1">Pending Verifications</p><h3 className="fw-bold mb-0 text-danger">{stats.pendingVerifications}</h3></div>
                <div className="bg-danger bg-opacity-10 rounded-circle p-3"><FaChartLine size={24} className="text-danger" /></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between">
              <h5 className="mb-0 fw-bold">Recent Orders</h5>
              <Button as={Link} to="/admin/orders" variant="link" className="text-success p-0">View All →</Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="fw-bold">{order.id}</td><td>{order.customer}</td><td>₹{order.amount}</td>
                      <td><Badge bg={order.status === 'delivered' ? 'success' : order.status === 'shipped' ? 'info' : 'warning'}>{order.status}</Badge></td>
                      <td>{order.date}</td><td><Button variant="outline-success" size="sm"><FaEye /></Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white"><h5 className="mb-0 fw-bold text-warning">Pending Farmer Verifications</h5></Card.Header>
            <Card.Body>
              {pendingFarmers.map(farmer => (
                <div key={farmer.id} className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 mb-2">
                  <div><h6 className="mb-1">{farmer.name}</h6><small className="text-muted">{farmer.farmName}<br />{farmer.email}</small><div><small>Applied: {farmer.appliedOn}</small></div></div>
                  <Button as={Link} to={`/admin/verify-farmer/${farmer.id}`} variant="success" size="sm">Verify</Button>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions - FIXED LINKS */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white"><h5 className="mb-0 fw-bold">Quick Actions</h5></Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={3}><Button as={Link} to="/admin/users" variant="outline-secondary" className="w-100">Manage Users</Button></Col>
                <Col md={3}><Button as={Link} to="/admin/products" variant="outline-secondary" className="w-100">Manage Products</Button></Col>
                <Col md={3}><Button as={Link} to="/admin/categories" variant="outline-secondary" className="w-100">Manage Categories</Button></Col>
                <Col md={3}><Button as={Link} to="/admin/reports" variant="outline-secondary" className="w-100">View Reports</Button></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;