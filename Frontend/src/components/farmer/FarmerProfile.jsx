import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Table } from 'react-bootstrap';
import { FaEdit, FaSave, FaTimes, FaCheckCircle } from 'react-icons/fa';
import Loader from '../common/Loader';

const FarmerProfile = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile({
        id: 1,
        name: 'Harpreet Singh',
        email: 'harpreet@singhfarms.com',
        phone: '9876543210',
        farmName: 'Singh Farms',
        farmAddress: '123 Green Fields, Punjab',
        landSize: 25,
        experience: 15,
        crops: ['Rice', 'Wheat', 'Vegetables'],
        isVerified: true,
        verifiedSince: '2024-01-15',
        rating: 4.8,
        totalReviews: 156,
        totalProducts: 24,
        totalOrders: 156,
        totalEarnings: 45680,
        address: {
          street: '456 Farm Road',
          city: 'Ludhiana',
          state: 'Punjab',
          pincode: '141001'
        },
        bankDetails: {
          accountName: 'Harpreet Singh',
          accountNumber: 'XXXXXX1234',
          bankName: 'State Bank of India',
          ifscCode: 'SBIN0001234'
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      alert('Profile updated successfully!');
    }, 1500);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={4}>
          {/* Profile Card */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <div className="position-relative d-inline-block mb-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                  alt={profile.name}
                  className="rounded-circle border border-3 border-success"
                  width="120"
                  height="120"
                  style={{ objectFit: 'cover' }}
                />
                {profile.isVerified && (
                  <FaCheckCircle 
                    className="text-success position-absolute bottom-0 end-0 bg-white rounded-circle"
                    size={24}
                  />
                )}
              </div>
              
              <h4 className="fw-bold mb-1">{profile.farmName}</h4>
              <p className="text-muted mb-2">{profile.name}</p>
              
              {profile.isVerified && (
                <Badge bg="success" className="mb-3">
                  ✓ Verified Farmer
                </Badge>
              )}
              
              <div className="d-flex justify-content-center gap-3 mb-3">
                <div>
                  <div className="fw-bold text-success">{profile.rating}</div>
                  <small className="text-muted">Rating</small>
                </div>
                <div>
                  <div className="fw-bold text-success">{profile.totalReviews}</div>
                  <small className="text-muted">Reviews</small>
                </div>
              </div>
              
              <Button 
                variant={editing ? 'success' : 'outline-success'} 
                className="w-100"
                onClick={() => editing ? handleSave() : setEditing(true)}
                disabled={saving}
              >
                {editing ? (
                  saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="me-2" /> Save Changes
                    </>
                  )
                ) : (
                  <>
                    <FaEdit className="me-2" /> Edit Profile
                  </>
                )}
              </Button>
              
              {editing && (
                <Button 
                  variant="outline-secondary" 
                  className="w-100 mt-2"
                  onClick={() => setEditing(false)}
                >
                  <FaTimes className="me-2" /> Cancel
                </Button>
              )}
            </Card.Body>
          </Card>

          {/* Stats Card */}
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="fw-bold mb-3">Farm Statistics</h6>
              <div className="mb-3">
                <small className="text-muted d-block">Total Products</small>
                <strong>{profile.totalProducts}</strong>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Total Orders</small>
                <strong>{profile.totalOrders}</strong>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Total Earnings</small>
                <strong className="text-success">₹{profile.totalEarnings}</strong>
              </div>
              <div>
                <small className="text-muted d-block">Member Since</small>
                <strong>{profile.verifiedSince}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {/* Farm Details */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold">Farm Details</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Farm Name</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="text" 
                        defaultValue={profile.farmName}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.farmName}</p>
                    )}
                  </Form.Group>
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Land Size</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="number" 
                        defaultValue={profile.landSize}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.landSize} acres</p>
                    )}
                  </Form.Group>
                </Col>
                
                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Farm Address</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="text" 
                        defaultValue={profile.farmAddress}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.farmAddress}</p>
                    )}
                  </Form.Group>
                </Col>
                
                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Crops Grown</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="text" 
                        defaultValue={profile.crops.join(', ')}
                      />
                    ) : (
                      <div>
                        {profile.crops.map((crop, index) => (
                          <Badge key={index} bg="success" className="me-2">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Experience</Form.Label>
                    <p className="fw-bold mb-0">{profile.experience} years</p>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold">Contact Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Full Name</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="text" 
                        defaultValue={profile.name}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.name}</p>
                    )}
                  </Form.Group>
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Email</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="email" 
                        defaultValue={profile.email}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.email}</p>
                    )}
                  </Form.Group>
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Phone</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="tel" 
                        defaultValue={profile.phone}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.phone}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              
              <h6 className="fw-bold mt-3 mb-3">Address</h6>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Street</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="text" 
                        defaultValue={profile.address.street}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.address.street}</p>
                    )}
                  </Form.Group>
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">City</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="text" 
                        defaultValue={profile.address.city}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.address.city}</p>
                    )}
                  </Form.Group>
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">State</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="text" 
                        defaultValue={profile.address.state}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.address.state}</p>
                    )}
                  </Form.Group>
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="text-muted small">Pincode</Form.Label>
                    {editing ? (
                      <Form.Control 
                        type="text" 
                        defaultValue={profile.address.pincode}
                      />
                    ) : (
                      <p className="fw-bold mb-0">{profile.address.pincode}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Bank Details */}
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold">Bank Details (for payments)</h5>
            </Card.Header>
            <Card.Body>
              <Table bordered>
                <tbody>
                  <tr>
                    <td className="bg-light" style={{ width: '200px' }}>Account Holder</td>
                    <td className="fw-bold">{profile.bankDetails.accountName}</td>
                  </tr>
                  <tr>
                    <td className="bg-light">Account Number</td>
                    <td className="fw-bold">{profile.bankDetails.accountNumber}</td>
                  </tr>
                  <tr>
                    <td className="bg-light">Bank Name</td>
                    <td className="fw-bold">{profile.bankDetails.bankName}</td>
                  </tr>
                  <tr>
                    <td className="bg-light">IFSC Code</td>
                    <td className="fw-bold">{profile.bankDetails.ifscCode}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmerProfile;  // <-- MAKE SURE THIS EXPORT EXISTS!