import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaCheckCircle, FaTruck, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa';
import { clearCart } from '../../redux/slices/cartSlice';
import { orderService } from '../../services/orderService';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
    paymentMethod: 'cod',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    notes: ''
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      navigate('/login');
    } else {
      console.log('User authenticated:', user?.email);
    }
  }, [isAuthenticated, navigate, user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      console.log('Cart is empty, redirecting to products');
      navigate('/products');
    }
  }, [items.length, navigate, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError('');
  };

  const handleAddressSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    setStep(2);
    setValidated(false);
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Verify user is still authenticated
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setError('Please login to place order');
        navigate('/login');
        return;
      }
      
      const orderData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          unit: item.unit
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      };
      
      console.log('Placing order:', orderData);
      const order = await orderService.createOrder(orderData);
      console.log('Order placed:', order);
      
      dispatch(clearCart());
      setOrderId(order.orderNumber);
      setStep(3);
      
    } catch (err) {
      console.error('Order failed:', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    placeOrder();
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">
          Please login to proceed with checkout.
        </Alert>
        <Button as={Link} to="/login" variant="success">
          Go to Login
        </Button>
      </Container>
    );
  }

  if (items.length === 0 && step !== 3) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="info">
          Your cart is empty.
        </Alert>
        <Button as={Link} to="/products" variant="success">
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="display-6 fw-bold mb-4">Checkout</h1>

      {/* Progress Steps */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-center">
              <div className={`rounded-circle bg-${step >= 1 ? 'success' : 'light'} text-${step >= 1 ? 'white' : 'muted'} d-inline-flex align-items-center justify-content-center mb-2`} 
                   style={{ width: '40px', height: '40px' }}>
                1
              </div>
              <div className="small fw-bold">Address</div>
            </div>
            <div className={`flex-grow-1 mx-3`} style={{ height: '2px', backgroundColor: step >= 2 ? '#198754' : '#dee2e6' }}></div>
            
            <div className="text-center">
              <div className={`rounded-circle bg-${step >= 2 ? 'success' : 'light'} text-${step >= 2 ? 'white' : 'muted'} d-inline-flex align-items-center justify-content-center mb-2`}
                   style={{ width: '40px', height: '40px' }}>
                2
              </div>
              <div className="small fw-bold">Payment</div>
            </div>
            <div className={`flex-grow-1 mx-3`} style={{ height: '2px', backgroundColor: step >= 3 ? '#198754' : '#dee2e6' }}></div>
            
            <div className="text-center">
              <div className={`rounded-circle bg-${step >= 3 ? 'success' : 'light'} text-${step >= 3 ? 'white' : 'muted'} d-inline-flex align-items-center justify-content-center mb-2`}
                   style={{ width: '40px', height: '40px' }}>
                3
              </div>
              <div className="small fw-bold">Complete</div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Main Form */}
        <Col lg={8}>
          {step === 1 && (
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">
                  <FaMapMarkerAlt className="text-success me-2" />
                  Delivery Address
                </h5>
              </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleAddressSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="fullName">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your full name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group controlId="phone">
                        <Form.Label>Phone Number *</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{10}"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid 10-digit phone number.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Group controlId="address">
                        <Form.Label>Street Address *</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your address.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={4} className="mb-3">
                      <Form.Group controlId="city">
                        <Form.Label>City *</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your city.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={4} className="mb-3">
                      <Form.Group controlId="state">
                        <Form.Label>State *</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your state.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={4} className="mb-3">
                      <Form.Group controlId="pincode">
                        <Form.Label>Pincode *</Form.Label>
                        <Form.Control
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{6}"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid 6-digit pincode.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Group controlId="notes">
                        <Form.Label>Order Notes (Optional)</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="notes"
                          rows="3"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Any special instructions for delivery..."
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end">
                    <Button type="submit" variant="success" size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">
                  <FaCreditCard className="text-success me-2" />
                  Payment Method
                </h5>
              </Card.Header>
              <Card.Body>
                {error && (
                  <Alert variant="danger" className="mb-3" onClose={() => setError('')} dismissible>
                    {error}
                  </Alert>
                )}
                
                <Form noValidate validated={validated} onSubmit={handlePaymentSubmit}>
                  <div className="mb-4">
                    <Form.Check
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      label={
                        <div>
                          <span className="fw-bold">Cash on Delivery (COD)</span>
                          <div className="small text-muted">Pay when you receive your order</div>
                        </div>
                      }
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="border p-3 rounded-3 mb-2"
                    />
                  </div>

                  <div className="d-flex gap-3 mt-4">
                    <Button variant="outline-secondary" size="lg" className="flex-grow-1" onClick={() => setStep(1)}>
                      Back to Address
                    </Button>
                    <Button type="submit" variant="success" size="lg" className="flex-grow-1" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}

          {step === 3 && (
            <Card className="shadow-sm text-center p-5">
              <FaCheckCircle className="text-success mx-auto mb-4" size={64} />
              <h2 className="h4 fw-bold mb-3">Order Placed Successfully!</h2>
              <p className="text-muted mb-4">
                Thank you for your order. We'll send you a confirmation shortly.
              </p>
              <Alert variant="success" className="mb-4">
                Order ID: {orderId}
              </Alert>
              <div className="d-flex gap-3 justify-content-center">
                <Button as={Link} to="/orders" variant="success">
                  View My Orders
                </Button>
                <Button as={Link} to="/products" variant="outline-success">
                  Continue Shopping
                </Button>
              </div>
            </Card>
          )}
        </Col>

        {/* Order Summary */}
        {step !== 3 && (
          <Col lg={4}>
            <Card className="shadow-sm sticky-top" style={{ top: '80px' }}>
              <Card.Header className="bg-white">
                <h5 className="mb-0 fw-bold">Your Order</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  {items.map(item => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="fw-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span className="text-success">₹{totalAmount}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Checkout;