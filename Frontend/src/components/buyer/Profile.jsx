import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Image, Badge } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import { getUserProfile, updateUserProfile, clearError } from '../../redux/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });

  useEffect(() => {
    // Fetch latest user profile
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    if (error) dispatch(clearError());
  };

  const handleImageUpload = async (e) => {
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
      setProfileImage(file);
      // Here you would upload to server
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    
    try {
      const result = await dispatch(updateUserProfile(formData)).unwrap();
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading profile...</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">Please login to view your profile</Alert>
        <Button as={Link} to="/login" variant="success">Go to Login</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={4}>
          {/* Profile Card */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <div className="position-relative d-inline-block mb-3">
                <Image 
                  src={user.profileImage || 'https://via.placeholder.com/150'} 
                  roundedCircle 
                  width="120" 
                  height="120"
                  className="border border-3 border-success"
                  style={{ objectFit: 'cover' }}
                />
                <div 
                  className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => document.getElementById('profileImage').click()}
                >
                  <FaCamera size={12} color="white" />
                </div>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageUpload}
                />
              </div>
              <h4 className="fw-bold mb-1">{user.name}</h4>
              <p className="text-muted mb-2">{user.email}</p>
              <p className="mb-0">
                <Badge bg={user.role === 'admin' ? 'danger' : user.role === 'farmer' ? 'success' : 'info'}>
                  {user.role?.toUpperCase()}
                </Badge>
              </p>
              {user.isVerified && (
                <p className="mt-2 text-success small">✓ Verified Account</p>
              )}
            </Card.Body>
          </Card>

          {/* Stats Card */}
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="fw-bold mb-3">Account Statistics</h6>
              <div className="mb-3">
                <small className="text-muted d-block">Member Since</small>
                <strong>{new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Account Status</small>
                <Badge bg={user.isActive ? 'success' : 'danger'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {/* Profile Edit Form */}
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Profile Information</h5>
              {!editing && (
                <Button variant="outline-success" size="sm" onClick={() => setEditing(true)}>
                  <FaEdit className="me-1" /> Edit Profile
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>{error}</Alert>}
              {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group controlId="name">
                      <Form.Label className="fw-semibold">Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editing}
                        className={!editing ? 'bg-light' : ''}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Group controlId="email">
                      <Form.Label className="fw-semibold">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        value={user.email}
                        disabled
                        className="bg-light"
                      />
                      <Form.Text className="text-muted">Email cannot be changed</Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Group controlId="phone">
                      <Form.Label className="fw-semibold">Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editing}
                        className={!editing ? 'bg-light' : ''}
                        pattern="[0-9]{10}"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mb-2">
                    <h6 className="fw-bold text-success">Address Information</h6>
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Group controlId="address.street">
                      <Form.Label className="fw-semibold">Street Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        disabled={!editing}
                        className={!editing ? 'bg-light' : ''}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Group controlId="address.city">
                      <Form.Label className="fw-semibold">City</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        disabled={!editing}
                        className={!editing ? 'bg-light' : ''}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Group controlId="address.state">
                      <Form.Label className="fw-semibold">State</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        disabled={!editing}
                        className={!editing ? 'bg-light' : ''}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Group controlId="address.pincode">
                      <Form.Label className="fw-semibold">Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.pincode"
                        value={formData.address.pincode}
                        onChange={handleChange}
                        disabled={!editing}
                        className={!editing ? 'bg-light' : ''}
                        pattern="[0-9]{6}"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {editing && (
                  <div className="d-flex gap-2 mt-3">
                    <Button type="submit" variant="success" disabled={saving}>
                      {saving ? <Spinner as="span" animation="border" size="sm" /> : <><FaSave className="me-1" /> Save Changes</>}
                    </Button>
                    <Button variant="outline-secondary" onClick={() => {
                      setEditing(false);
                      setFormData({
                        name: user.name || '',
                        phone: user.phone || '',
                        address: {
                          street: user.address?.street || '',
                          city: user.address?.city || '',
                          state: user.address?.state || '',
                          pincode: user.address?.pincode || ''
                        }
                      });
                    }}>
                      <FaTimes className="me-1" /> Cancel
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>

          {/* Farmer Specific Information */}
          {user.role === 'farmer' && (
            <Card className="shadow-sm mt-4">
              <Card.Header className="bg-white">
                <h5 className="mb-0 fw-bold">Farm Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="text-muted small">Farm Name</Form.Label>
                      <p className="fw-bold mb-0">{user.farmDetails?.farmName || 'Not provided'}</p>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="text-muted small">Land Size</Form.Label>
                      <p className="fw-bold mb-0">{user.farmDetails?.landSize || 0} acres</p>
                    </Form.Group>
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label className="text-muted small">Farm Address</Form.Label>
                      <p className="fw-bold mb-0">{user.farmDetails?.farmAddress || 'Not provided'}</p>
                    </Form.Group>
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label className="text-muted small">Crops Grown</Form.Label>
                      <div>
                        {user.farmDetails?.crops?.length > 0 ? (
                          user.farmDetails.crops.map((crop, idx) => (
                            <Badge key={idx} bg="success" className="me-1 mb-1">{crop}</Badge>
                          ))
                        ) : (
                          <p className="mb-0 text-muted">Not provided</p>
                        )}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;