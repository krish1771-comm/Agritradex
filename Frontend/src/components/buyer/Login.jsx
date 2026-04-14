import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, Row, Col, Card, Form, Button, 
  Alert, InputGroup, Spinner
} from 'react-bootstrap';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginUser, clearError } from '../../redux/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Redirect based on user role after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'farmer') {
        navigate('/farmer/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    dispatch(loginUser({ 
      email: formData.email, 
      password: formData.password 
    }));
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="bg-success p-4 text-white text-center">
              <h2 className="fw-bold mb-0">Welcome Back</h2>
              <p className="mb-0 opacity-75">Sign in to continue to AgriTradeX</p>
            </div>

            <Card.Body className="p-4 p-lg-5">
              {error && (
                <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
                  {error}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light">
                      <FaEnvelope className="text-success" />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light">
                      <FaLock className="text-success" />
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      minLength={6}
                      className="py-2"
                    />
                    <Button 
                      variant="outline-light" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="border"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 6 characters.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="w-100 py-2 mb-4 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                {/* Demo Credentials */}
                <div className="bg-light p-3 rounded-3 mb-4">
                  <p className="small text-muted mb-2">
                    <strong>Demo Credentials:</strong>
                  </p>
                  <div className="small">
                    <div className="d-flex justify-content-between mb-1">
                      <span>👨‍🌾 Farmer:</span>
                      <code>farmer@agritradex.com / password123</code>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span>👤 Buyer:</span>
                      <code>buyer@agritradex.com / buyer123</code>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>👑 Admin:</span>
                      <code>admin@agritradex.com / admin123</code>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-success fw-bold text-decoration-none">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;