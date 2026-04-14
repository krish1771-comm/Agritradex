import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { FaEye, FaCalendarAlt } from 'react-icons/fa';
import { orderService } from '../../services/orderService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching orders for user:', user?._id);
      const data = await orderService.getMyOrders();
      console.log('Orders received:', data);
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'warning', text: 'Pending' },
      confirmed: { variant: 'info', text: 'Confirmed' },
      processing: { variant: 'primary', text: 'Processing' },
      shipped: { variant: 'info', text: 'Shipped' },
      delivered: { variant: 'success', text: 'Delivered' },
      cancelled: { variant: 'danger', text: 'Cancelled' },
    };
    const config = statusConfig[status] || { variant: 'secondary', text: status };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading your orders...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Orders</Alert.Heading>
          <p>{error}</p>
          <hr />
          <Button variant="outline-danger" onClick={fetchOrders}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card className="shadow-sm p-5">
              <div className="display-1 mb-4">📦</div>
              <h2 className="h4 mb-3">No Orders Yet</h2>
              <p className="text-muted mb-4">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Button as={Link} to="/products" variant="success" size="lg">
                Start Shopping
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-6 fw-bold">My Orders</h1>
          <p className="text-muted">Track and manage all your orders</p>
        </Col>
      </Row>

      {orders.map((order) => (
        <Card key={order._id} className="shadow-sm mb-4 border-0">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <strong className="me-3">Order #{order.orderNumber}</strong>
              <small className="text-muted">
                <FaCalendarAlt className="me-1" /> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </small>
            </div>
            <div>
              {getStatusBadge(order.orderStatus)}
            </div>
          </Card.Header>
          
          <Card.Body>
            <Row>
              <Col md={8}>
                <h6 className="fw-bold mb-3">Order Items</h6>
                {order.items && order.items.map((item, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-3 pb-2 border-bottom">
                    <img 
                      src={item.image || 'https://via.placeholder.com/60'} 
                      alt={item.name}
                      className="rounded me-3"
                      width="60"
                      height="60"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <Link to={`/product/${item.product}`} className="text-decoration-none text-dark fw-bold">
                        {item.name}
                      </Link>
                      <div className="small text-muted">Quantity: {item.quantity} {item.unit}</div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-success">₹{item.price * item.quantity}</div>
                      <small className="text-muted">₹{item.price}/{item.unit}</small>
                    </div>
                  </div>
                ))}
              </Col>
              
              <Col md={4}>
                <Card className="bg-light border-0">
                  <Card.Body>
                    <h6 className="fw-bold mb-3">Order Summary</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total:</span>
                      <span className="fw-bold text-success">₹{order.totalAmount}</span>
                    </div>
                    <hr />
                    <h6 className="fw-bold mb-2">Shipping Address</h6>
                    <p className="small mb-0">{order.shippingAddress?.fullName}</p>
                    <p className="small mb-0">{order.shippingAddress?.phone}</p>
                    <p className="small">{order.shippingAddress?.address}, {order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
          
          <Card.Footer className="bg-white">
            <Button as={Link} to={`/order/${order._id}`} variant="outline-success" size="sm">
              <FaEye className="me-1" /> View Details
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

export default MyOrders;