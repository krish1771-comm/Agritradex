import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Button, Form } from 'react-bootstrap';
import { FaEye, FaCheck, FaTruck, FaBox } from 'react-icons/fa';
import Loader from '../common/Loader';

const FarmerOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: '#ORD001',
          customer: 'Rajesh Kumar',
          products: [
            { name: 'Organic Basmati Rice', quantity: 2, price: 120 },
            { name: 'Fresh Turmeric', quantity: 1, price: 180 }
          ],
          total: 420,
          status: 'pending',
          date: '2024-03-10',
          address: '123 Main St, Rajkot, Gujarat',
          phone: '9876543210'
        },
        {
          id: '#ORD002',
          customer: 'Priya Sharma',
          products: [
            { name: 'Alphonso Mangoes', quantity: 2, price: 350 }
          ],
          total: 700,
          status: 'confirmed',
          date: '2024-03-09',
          address: '456 Park Ave, Ahmedabad, Gujarat',
          phone: '9876543211'
        },
        {
          id: '#ORD003',
          customer: 'Amit Patel',
          products: [
            { name: 'Fresh Spinach', quantity: 3, price: 30 },
            { name: 'Organic Wheat Flour', quantity: 5, price: 65 }
          ],
          total: 415,
          status: 'shipped',
          date: '2024-03-08',
          address: '789 Lake Rd, Surat, Gujarat',
          phone: '9876543212'
        },
        {
          id: '#ORD004',
          customer: 'Sunita Reddy',
          products: [
            { name: 'Organic Turmeric Powder', quantity: 2, price: 180 }
          ],
          total: 360,
          status: 'delivered',
          date: '2024-03-07',
          address: '321 Hill St, Vadodara, Gujarat',
          phone: '9876543213'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => 
    filter === 'all' ? true : order.status === filter
  );

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="py-5">
      <h1 className="display-6 fw-bold mb-4">Manage Orders</h1>

      {/* Filter Tabs */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex gap-2 flex-wrap">
            <Button 
              variant={filter === 'all' ? 'success' : 'outline-secondary'}
              onClick={() => setFilter('all')}
            >
              All Orders ({orders.length})
            </Button>
            <Button 
              variant={filter === 'pending' ? 'warning' : 'outline-secondary'}
              onClick={() => setFilter('pending')}
            >
              Pending ({orders.filter(o => o.status === 'pending').length})
            </Button>
            <Button 
              variant={filter === 'confirmed' ? 'info' : 'outline-secondary'}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed ({orders.filter(o => o.status === 'confirmed').length})
            </Button>
            <Button 
              variant={filter === 'shipped' ? 'primary' : 'outline-secondary'}
              onClick={() => setFilter('shipped')}
            >
              Shipped ({orders.filter(o => o.status === 'shipped').length})
            </Button>
            <Button 
              variant={filter === 'delivered' ? 'success' : 'outline-secondary'}
              onClick={() => setFilter('delivered')}
            >
              Delivered ({orders.filter(o => o.status === 'delivered').length})
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card className="shadow-sm text-center p-5">
          <p className="text-muted mb-0">No orders found</p>
        </Card>
      ) : (
        filteredOrders.map(order => (
          <Card key={order.id} className="shadow-sm mb-4">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <div>
                <strong className="me-3">{order.id}</strong>
                <span className="text-muted">{order.date}</span>
              </div>
              {getStatusBadge(order.status)}
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h6 className="fw-bold mb-3">Customer Details</h6>
                  <p className="mb-1"><strong>Name:</strong> {order.customer}</p>
                  <p className="mb-1"><strong>Phone:</strong> {order.phone}</p>
                  <p className="mb-3"><strong>Address:</strong> {order.address}</p>

                  <h6 className="fw-bold mb-3">Products</h6>
                  <Table size="sm" bordered>
                    <thead className="bg-light">
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>₹{product.price}</td>
                          <td>₹{product.price * product.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>

                <Col md={4}>
                  <Card className="bg-light">
                    <Card.Body>
                      <h6 className="fw-bold mb-3">Order Summary</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal:</span>
                        <strong>₹{order.total}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <span>Delivery:</span>
                        <strong className="text-success">Free</strong>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between mb-4">
                        <span className="h6">Total:</span>
                        <span className="h6 text-success">₹{order.total}</span>
                      </div>

                      <h6 className="fw-bold mb-2">Update Status</h6>
                      <div className="d-grid gap-2">
                        {order.status === 'pending' && (
                          <Button 
                            variant="info" 
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          >
                            <FaCheck className="me-2" /> Confirm Order
                          </Button>
                        )}
                        {order.status === 'confirmed' && (
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                          >
                            <FaTruck className="me-2" /> Mark as Shipped
                          </Button>
                        )}
                        {order.status === 'shipped' && (
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                          >
                            <FaBox className="me-2" /> Mark as Delivered
                          </Button>
                        )}
                        <Button variant="outline-secondary" size="sm">
                          <FaEye className="me-2" /> View Details
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default FarmerOrders;