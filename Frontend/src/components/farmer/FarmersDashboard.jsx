import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { FaBox, FaShoppingBag, FaRupeeSign, FaStar, FaPlus, FaEye } from 'react-icons/fa';
import Loader from '../common/Loader';

const FarmersDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    averageRating: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalProducts: 24,
        totalOrders: 156,
        totalEarnings: 45680,
        averageRating: 4.7
      });

      setRecentOrders([
        { id: '#ORD001', customer: 'Rajesh Kumar', items: 3, total: 1240, status: 'pending', date: '2024-03-10' },
        { id: '#ORD002', customer: 'Priya Sharma', items: 2, total: 860, status: 'shipped', date: '2024-03-09' },
        { id: '#ORD003', customer: 'Amit Patel', items: 5, total: 2150, status: 'delivered', date: '2024-03-08' },
        { id: '#ORD004', customer: 'Sunita Reddy', items: 1, total: 450, status: 'pending', date: '2024-03-08' },
      ]);

      setLowStockProducts([
        { 
          id: 1, 
          name: 'Organic Basmati Rice', 
          stock: 8, 
          unit: 'kg', 
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100' 
        },
        { 
          id: 2, 
          name: 'Fresh Turmeric', 
          stock: 5, 
          unit: 'kg', 
          image: 'https://images.unsplash.com/photo-1615485500704-8e990c282e8a?w=100' 
        },
        { 
          id: 3, 
          name: 'Alphonso Mangoes', 
          stock: 3, 
          unit: 'dozen', 
          image: 'https://images.unsplash.com/photo-1553279768-865429fa5938?w=100' 
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="display-6 fw-bold">Farmer Dashboard</h1>
          <p className="text-muted">Welcome back! Here's what's happening with your farm today.</p>
        </Col>
        <Col xs="auto">
          <Button as={Link} to="/farmer/add-product" variant="success">
            <FaPlus className="me-2" /> Add New Product
          </Button>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-4 mb-5">
        <Col md={3}>
          <Card className="shadow-sm border-0 bg-primary bg-opacity-10">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">Total Products</p>
                  <h3 className="fw-bold mb-0">{stats.totalProducts}</h3>
                </div>
                <div className="bg-primary text-white rounded-circle p-3">
                  <FaBox size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 bg-success bg-opacity-10">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">Total Orders</p>
                  <h3 className="fw-bold mb-0">{stats.totalOrders}</h3>
                </div>
                <div className="bg-success text-white rounded-circle p-3">
                  <FaShoppingBag size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 bg-warning bg-opacity-10">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">Total Earnings</p>
                  <h3 className="fw-bold mb-0">₹{stats.totalEarnings}</h3>
                </div>
                <div className="bg-warning text-white rounded-circle p-3">
                  <FaRupeeSign size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 bg-info bg-opacity-10">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">Average Rating</p>
                  <h3 className="fw-bold mb-0">{stats.averageRating}</h3>
                </div>
                <div className="bg-info text-white rounded-circle p-3">
                  <FaStar size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Recent Orders */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Recent Orders</h5>
              <Button as={Link} to="/farmer/orders" variant="link" className="text-success p-0">
                View All →
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="fw-bold">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.items}</td>
                      <td>₹{order.total}</td>
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
                        <Button 
                          as={Link} 
                          to={`/farmer/order/${order.id}`} 
                          variant="outline-success" 
                          size="sm"
                        >
                          <FaEye />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Low Stock Alert */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold text-warning">Low Stock Alert</h5>
            </Card.Header>
            <Card.Body>
              {lowStockProducts.length > 0 ? (
                <div className="vstack gap-3">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="d-flex align-items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="rounded-3 me-3"
                        width="50"
                        height="50"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{product.name}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-danger">Only {product.stock} {product.unit} left</small>
                          <Button 
                            as={Link} 
                            to={`/farmer/edit-product/${product.id}`}
                            variant="outline-success" 
                            size="sm"
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-3">All products are well stocked!</p>
              )}
              
              <hr />
              
              <Button as={Link} to="/farmer/my-products" variant="link" className="text-success w-100">
                Manage All Products →
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmersDashboard;