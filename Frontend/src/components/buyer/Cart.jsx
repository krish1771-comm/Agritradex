import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Table, Image, Button, Card, Form } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card className="shadow-sm p-5">
              <FaShoppingBag className="text-muted mx-auto mb-4" size={64} />
              <h2 className="h4 mb-3">Your Cart is Empty</h2>
              <p className="text-muted mb-4">Looks like you haven't added any products yet.</p>
              <Button as={Link} to="/products" variant="success" size="lg" className="mx-auto" style={{ maxWidth: '200px' }}>
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
      <h1 className="display-6 fw-bold mb-4">Shopping Cart</h1>

      <Row className="g-4">
        {/* Cart Items */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Table responsive className="mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <Image 
                          src={item.image || 'https://via.placeholder.com/60'} 
                          alt={item.name}
                          width="60"
                          height="60"
                          className="rounded-3 me-3"
                          style={{ objectFit: 'cover' }}
                        />
                        <div>
                          <Link to={`/product/${item.id}`} className="text-decoration-none text-dark fw-bold">
                            {item.name}
                          </Link>
                          <div className="small text-muted">Sold by: {item.farmer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="fw-bold">₹{item.price}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button 
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2"
                        >
                          <FaMinus size={12} />
                        </Button>
                        <Form.Control 
                          type="number" 
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="mx-2 text-center"
                          style={{ width: '60px' }}
                          min="1"
                        />
                        <Button 
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2"
                        >
                          <FaPlus size={12} />
                        </Button>
                      </div>
                    </td>
                    <td className="fw-bold text-success">₹{item.price * item.quantity}</td>
                    <td>
                      <Button 
                        variant="link" 
                        className="text-danger p-0"
                        onClick={() => handleRemove(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '80px' }}>
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Total Items:</span>
                <span className="fw-bold">{totalQuantity}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal:</span>
                <span className="fw-bold">₹{totalAmount}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Delivery:</span>
                <span className="fw-bold text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="h5 fw-bold">Total:</span>
                <span className="h5 fw-bold text-success">₹{totalAmount}</span>
              </div>

              <Button 
                variant="success" 
                size="lg" 
                className="w-100 mb-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <Button 
                as={Link} 
                to="/products" 
                variant="outline-secondary" 
                className="w-100"
              >
                Continue Shopping
              </Button>

              <div className="text-center mt-3 small text-muted">
                <p className="mb-1">✓ Secure Payment</p>
                <p>✓ 7 Day Return Policy</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;