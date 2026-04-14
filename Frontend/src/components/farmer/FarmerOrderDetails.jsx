import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import Loader from '../common/Loader';

const FarmerOrderDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder({
        id: id,
        customer: 'Rajesh Kumar',
        phone: '9876543210',
        address: '123 Main St, Rajkot, Gujarat - 360001',
        date: '2024-03-10',
        status: 'pending',
        items: [
          { name: 'Organic Basmati Rice', quantity: 2, price: 120, unit: 'kg' },
          { name: 'Fresh Turmeric', quantity: 1, price: 180, unit: 'kg' }
        ],
        total: 420,
        paymentMethod: 'COD',
        paymentStatus: 'pending'
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const updateOrderStatus = (newStatus) => {
    setOrder({ ...order, status: newStatus });
    alert(`Order status updated to ${newStatus}`);
  };

  if (loading) return <Loader />;
  if (!order) return (
    <Container className="py-5 text-center">
      <h3>Order not found</h3>
      <Button as={Link} to="/farmer/orders" variant="success" className="mt-3">
        Back to Orders
      </Button>
    </Container>
  );

  return (
    <Container className="py-5">
      <Button as={Link} to="/farmer/orders" variant="link" className="text-success mb-3">
        <FaArrowLeft /> Back to Orders
      </Button>
      
      <Card className="shadow-sm">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Order Details {order.id}</h4>
          <Badge bg={
            order.status === 'delivered' ? 'success' :
            order.status === 'shipped' ? 'info' :
            order.status === 'confirmed' ? 'primary' : 'warning'
          } className="px-3 py-2">
            {order.status}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <h5 className="border-bottom pb-2">Customer Information</h5>
              <p><strong>Name:</strong> {order.customer}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Delivery Address:</strong> {order.address}</p>
            </Col>
            <Col md={6}>
              <h5 className="border-bottom pb-2">Order Information</h5>
              <p><strong>Order Date:</strong> {order.date}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Payment Status:</strong> 
                <Badge bg={order.paymentStatus === 'completed' ? 'success' : 'warning'} className="ms-2">
                  {order.paymentStatus}
                </Badge>
              </p>
            </Col>
          </Row>
          
          <h5 className="border-bottom pb-2 mb-3">Order Items</h5>
          <Table bordered hover responsive>
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity} {item.unit}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <Row className="mt-4">
            <Col md={6}>
              <h5 className="border-bottom pb-2">Update Order Status</h5>
              <div className="d-flex gap-2 flex-wrap">
                {order.status === 'pending' && (
                  <Button variant="primary" onClick={() => updateOrderStatus('confirmed')}>
                    Confirm Order
                  </Button>
                )}
                {order.status === 'confirmed' && (
                  <Button variant="info" onClick={() => updateOrderStatus('shipped')}>
                    Mark as Shipped
                  </Button>
                )}
                {order.status === 'shipped' && (
                  <Button variant="success" onClick={() => updateOrderStatus('delivered')}>
                    Mark as Delivered
                  </Button>
                )}
              </div>
            </Col>
            <Col md={6} className="text-end">
              <h5>Order Total</h5>
              <h2 className="text-success">₹{order.total}</h2>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FarmerOrderDetails;