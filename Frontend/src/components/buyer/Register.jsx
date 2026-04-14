import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, Row, Col, Card, Form, Button, 
  Alert, InputGroup, Tab, Nav, Spinner
} from 'react-bootstrap';
import { 
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaPhone, FaTractor, FaMapMarkerAlt, FaIdCard,
  FaCamera
} from 'react-icons/fa';
import { registerUser, clearError } from '../../redux/slices/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [userType, setUserType] = useState('buyer');
  const [profileImage, setProfileImage] = useState(null);
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    farmName: '',
    farmAddress: '',
    landSize: '',
    experience: '',
    crops: '',
    aadharNumber: '',
    panNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (error) dispatch(clearError());
  };

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      setter(file);
    }
  };

  const validateForm = () => {
    if (!formData.name) return 'Name is required';
    if (!formData.email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Email is invalid';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.phone) return 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone)) return 'Phone number must be 10 digits';
    
    if (!formData.address) return 'Address is required';
    if (!formData.city) return 'City is required';
    if (!formData.state) return 'State is required';
    if (!formData.pincode) return 'Pincode is required';
    if (!/^\d{6}$/.test(formData.pincode)) return 'Pincode must be 6 digits';
    
    if (userType === 'farmer') {
      if (!formData.farmName) return 'Farm name is required';
      if (!formData.farmAddress) return 'Farm address is required';
      if (!formData.landSize) return 'Land size is required';
      if (isNaN(formData.landSize)) return 'Land size must be a number';
      if (!formData.aadharNumber) return 'Aadhar number is required';
      if (!/^\d{12}$/.test(formData.aadharNumber)) return 'Aadhar number must be 12 digits';
      if (!aadharFile) return 'Aadhar document is required';
    }
    
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    // Prepare data for API
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: userType,
      address: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      ...(userType === 'farmer' && {
        farmDetails: {
          farmName: formData.farmName,
          farmAddress: formData.farmAddress,
          landSize: Number(formData.landSize),
          experience: formData.experience ? Number(formData.experience) : 0,
          crops: formData.crops ? formData.crops.split(',').map(c => c.trim()) : []
        },
        verificationDocs: {
          aadharNumber: formData.aadharNumber,
          panNumber: formData.panNumber || ''
        }
      })
    };

    const result = await dispatch(registerUser(userData));
    
    if (result.payload && !result.error) {
      if (userType === 'farmer') {
        navigate('/farmer/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="bg-success p-4 text-white text-center">
              <h2 className="fw-bold mb-0">Create an Account</h2>
              <p className="mb-0 opacity-75">Join AgriTradeX today</p>
            </div>

            <Card.Body className="p-4 p-lg-5">
              {error && (
                <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
                  {error}
                </Alert>
              )}

              <div className="mb-4">
                <Nav variant="pills" activeKey={userType} className="justify-content-center">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="buyer" 
                      onClick={() => setUserType('buyer')}
                      className={userType === 'buyer' ? 'bg-success text-white' : 'text-success'}
                    >
                      <FaUser className="me-2" /> Join as Buyer
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="farmer" 
                      onClick={() => setUserType('farmer')}
                      className={userType === 'farmer' ? 'bg-success text-white' : 'text-success'}
                    >
                      <FaTractor className="me-2" /> Join as Farmer
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Profile Image Upload */}
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <div 
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center border"
                      style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                      onClick={() => document.getElementById('profileImage').click()}
                    >
                      {profileImage ? (
                        <img 
                          src={URL.createObjectURL(profileImage)} 
                          alt="Profile"
                          className="rounded-circle w-100 h-100 object-fit-cover"
                        />
                      ) : (
                        <FaCamera size={30} className="text-muted" />
                      )}
                    </div>
                    <Form.Control
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      className="d-none"
                      onChange={(e) => handleImageUpload(e, setProfileImage)}
                    />
                  </div>
                  <Form.Text className="text-muted d-block mt-2">
                    Upload profile picture (optional)
                  </Form.Text>
                </div>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="name">
                      <Form.Label className="fw-semibold">Full Name *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaUser className="text-success" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="email">
                      <Form.Label className="fw-semibold">Email Address *</Form.Label>
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
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="password">
                      <Form.Label className="fw-semibold">Password *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaLock className="text-success" />
                        </InputGroup.Text>
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                          required
                          minLength={6}
                        />
                        <Button 
                          variant="outline-light" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="border"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputGroup>
                      <Form.Text className="text-muted">
                        Minimum 6 characters
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="confirmPassword">
                      <Form.Label className="fw-semibold">Confirm Password *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaLock className="text-success" />
                        </InputGroup.Text>
                        <Form.Control
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          required
                        />
                        <Button 
                          variant="outline-light" 
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="border"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Group controlId="phone">
                      <Form.Label className="fw-semibold">Phone Number *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaPhone className="text-success" />
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10 digit mobile number"
                          required
                          pattern="[0-9]{10}"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mb-2">
                    <h6 className="fw-bold text-success">Address Information</h6>
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Group controlId="address">
                      <Form.Label className="fw-semibold">Street Address *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaMapMarkerAlt className="text-success" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your street address"
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Group controlId="city">
                      <Form.Label className="fw-semibold">City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Group controlId="state">
                      <Form.Label className="fw-semibold">State *</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Group controlId="pincode">
                      <Form.Label className="fw-semibold">Pincode *</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{6}"
                      />
                    </Form.Group>
                  </Col>

                  {userType === 'farmer' && (
                    <>
                      <Col md={12} className="mb-2 mt-3">
                        <h6 className="fw-bold text-success">Farm Information</h6>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group controlId="farmName">
                          <Form.Label className="fw-semibold">Farm Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="farmName"
                            value={formData.farmName}
                            onChange={handleChange}
                            required={userType === 'farmer'}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group controlId="landSize">
                          <Form.Label className="fw-semibold">Land Size (acres) *</Form.Label>
                          <Form.Control
                            type="number"
                            name="landSize"
                            value={formData.landSize}
                            onChange={handleChange}
                            required={userType === 'farmer'}
                            step="0.1"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12} className="mb-3">
                        <Form.Group controlId="farmAddress">
                          <Form.Label className="fw-semibold">Farm Address *</Form.Label>
                          <Form.Control
                            type="text"
                            name="farmAddress"
                            value={formData.farmAddress}
                            onChange={handleChange}
                            required={userType === 'farmer'}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group controlId="experience">
                          <Form.Label className="fw-semibold">Years of Experience</Form.Label>
                          <Form.Control
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            min="0"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group controlId="crops">
                          <Form.Label className="fw-semibold">Crops Grown</Form.Label>
                          <Form.Control
                            type="text"
                            name="crops"
                            value={formData.crops}
                            onChange={handleChange}
                            placeholder="e.g., Rice, Wheat, Vegetables"
                          />
                          <Form.Text className="text-muted">
                            Separate multiple crops with commas
                          </Form.Text>
                        </Form.Group>
                      </Col>

                      <Col md={12} className="mb-2 mt-3">
                        <h6 className="fw-bold text-success">KYC Documents</h6>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group controlId="aadharNumber">
                          <Form.Label className="fw-semibold">Aadhar Number *</Form.Label>
                          <Form.Control
                            type="text"
                            name="aadharNumber"
                            value={formData.aadharNumber}
                            onChange={handleChange}
                            required={userType === 'farmer'}
                            pattern="[0-9]{12}"
                            maxLength="12"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group controlId="panNumber">
                          <Form.Label className="fw-semibold">PAN Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-semibold">Upload Aadhar *</Form.Label>
                        <div 
                          className="border-2 border-dashed rounded-3 p-3 text-center bg-light"
                          style={{ cursor: 'pointer' }}
                          onClick={() => document.getElementById('aadharUpload').click()}
                        >
                          <FaIdCard size={30} className="text-muted mb-2" />
                          <p className="small mb-0">
                            {aadharFile ? aadharFile.name : 'Click to upload Aadhar'}
                          </p>
                        </div>
                        <Form.Control
                          type="file"
                          id="aadharUpload"
                          accept="image/*,.pdf"
                          className="d-none"
                          onChange={(e) => handleImageUpload(e, setAadharFile)}
                        />
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-semibold">Upload PAN (Optional)</Form.Label>
                        <div 
                          className="border-2 border-dashed rounded-3 p-3 text-center bg-light"
                          style={{ cursor: 'pointer' }}
                          onClick={() => document.getElementById('panUpload').click()}
                        >
                          <FaIdCard size={30} className="text-muted mb-2" />
                          <p className="small mb-0">
                            {panFile ? panFile.name : 'Click to upload PAN'}
                          </p>
                        </div>
                        <Form.Control
                          type="file"
                          id="panUpload"
                          accept="image/*,.pdf"
                          className="d-none"
                          onChange={(e) => handleImageUpload(e, setPanFile)}
                        />
                      </Col>
                    </>
                  )}
                </Row>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span>
                        I agree to the{' '}
                        <Link to="/terms" className="text-success">Terms of Service</Link> and{' '}
                        <Link to="/privacy" className="text-success">Privacy Policy</Link>
                      </span>
                    }
                    required
                  />
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
                      Creating Account...
                    </>
                  ) : (
                    userType === 'farmer' ? 'Register as Farmer' : 'Create Account'
                  )}
                </Button>

                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-success fw-bold text-decoration-none">
                      Sign In
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

export default Register;