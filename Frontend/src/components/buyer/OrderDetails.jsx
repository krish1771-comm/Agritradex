import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Button, Spinner } from 'react-bootstrap';
import { FaArrowLeft, FaRupeeSign, FaCalendarAlt, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { orderService } from '../../services/orderService';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrderById(id);
      setOrder(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError(err.response?.data?.message || 'Failed to load order details');
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
        <p className="mt-3">Loading order details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <div className="text-danger mb-3">⚠️ {error}</div>
        <Button as={Link} to="/orders" variant="success">Back to Orders</Button>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-5 text-center">
        <h3>Order not found</h3>
        <Button as={Link} to="/orders" variant="success">Back to Orders</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button as={Link} to="/orders" variant="link" className="text-success mb-3">
        <FaArrowLeft className="me-1" /> Back to Orders
      </Button>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-white">
              <h4 className="mb-0">Order #{order.orderNumber}</h4>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.image || 'https://via.placeholder.com/50'} 
                            alt={item.name}
                            className="rounded me-3"
                            width="50"
                            height="50"
                            style={{ objectFit: 'cover' }}
                          />
                          <div>
                            <Link to={`/product/${item.product}`} className="text-decoration-none fw-bold">
                              {item.name}
                            </Link>
                            <div className="small text-muted">Sold by: {item.farmer?.farmName || 'Farmer'}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity} {item.unit}</td>
                      <td>₹{item.price}</td>
                      <td className="fw-bold">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery:</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span className="text-success">₹{order.totalAmount}</span>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Order Status</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                {getStatusBadge(order.orderStatus)}
              </div>
              <div className="small text-muted">
                Order placed on: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              {order.deliveredAt && (
                <div className="small text-success mt-2">
                  Delivered on: {new Date(order.deliveredAt).toLocaleDateString()}
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Shipping Address</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-1 fw-bold">{order.shippingAddress.fullName}</p>
              <p className="mb-1">{order.shippingAddress.phone}</p>
              <p className="mb-0">{order.shippingAddress.address}</p>
              <p className="mb-0">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p>{order.shippingAddress.pincode}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;