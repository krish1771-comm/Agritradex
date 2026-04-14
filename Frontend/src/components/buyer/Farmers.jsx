import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { FaSearch, FaStar, FaCheckCircle, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';
import Loader from '../common/Loader';

const Farmers = () => {
  const [loading, setLoading] = useState(true);
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);

  useEffect(() => {
    // Simulate API call with organic farmers data
    setTimeout(() => {
      setFarmers([
        {
          id: 1,
          name: 'Harpreet Singh',
          farmName: 'Singh Organic Farms',
          email: 'harpreet@singhorganic.com',
          phone: '9876543210',
          location: 'Ludhiana, Punjab',
          profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
          rating: 4.8,
          totalReviews: 156,
          isVerified: true,
          isOrganic: true,
          products: 24,
          landSize: 25,
          experience: 15,
          crops: ['Organic Rice', 'Organic Wheat', 'Organic Vegetables'],
          description: 'Third-generation organic farmers practicing sustainable agriculture since 1985.'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          farmName: 'Priya Organic Farms',
          email: 'priya@priyaorganic.com',
          phone: '9876543211',
          location: 'Nasik, Maharashtra',
          profileImage: 'https://images.unsplash.com/photo-1494790108777-223d9f034c0f?w=400',
          coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef385e?w=800',
          rating: 4.9,
          totalReviews: 203,
          isVerified: true,
          isOrganic: true,
          products: 32,
          landSize: 30,
          experience: 12,
          crops: ['Organic Grapes', 'Organic Mangoes', 'Organic Vegetables'],
          description: 'Certified organic vineyard and orchard, specializing in export-quality fruits.'
        },
        {
          id: 3,
          name: 'Ramesh Patel',
          farmName: 'Patel Organic Orchards',
          email: 'ramesh@patelorganic.com',
          phone: '9876543212',
          location: 'Ratnagiri, Maharashtra',
          profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
          coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
          rating: 4.5,
          totalReviews: 98,
          isVerified: true,
          isOrganic: true,
          products: 18,
          landSize: 15,
          experience: 20,
          crops: ['Organic Mangoes', 'Organic Cashews', 'Organic Coconuts'],
          description: 'Specializing in organic Alphonso mangoes and traditional farming methods.'
        },
        {
          id: 4,
          name: 'Lakshmi Reddy',
          farmName: 'Reddy Organic Farms',
          email: 'lakshmi@reddyorganic.com',
          phone: '9876543213',
          location: 'Chittoor, Andhra Pradesh',
          profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
          rating: 4.7,
          totalReviews: 134,
          isVerified: true,
          isOrganic: true,
          products: 28,
          landSize: 22,
          experience: 8,
          crops: ['Organic Tomatoes', 'Organic Chillies', 'Organic Vegetables'],
          description: 'Young entrepreneur bringing organic farming to the new generation.'
        },
        {
          id: 5,
          name: 'Gurdev Singh',
          farmName: 'Green Valley Organics',
          email: 'gurdev@greenvalley.com',
          phone: '9876543214',
          location: 'Amritsar, Punjab',
          profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
          rating: 4.2,
          totalReviews: 45,
          isVerified: false,
          isOrganic: true,
          products: 12,
          landSize: 12,
          experience: 5,
          crops: ['Organic Wheat', 'Organic Maize', 'Organic Vegetables'],
          description: 'New generation farmer focusing on organic and sustainable practices.'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...farmers];
    
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (filterOrganic) {
      filtered = filtered.filter(f => f.isOrganic);
    }
    
    if (filterVerified) {
      filtered = filtered.filter(f => f.isVerified);
    }
    
    setFilteredFarmers(filtered);
  }, [searchTerm, filterOrganic, filterVerified, farmers]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="bg-success text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 60, 0, 0.8), rgba(0, 40, 0, 0.8)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef385e?w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container className="text-center py-5">
          <h1 className="display-4 fw-bold mb-4">Our Organic Farmers</h1>
          <p className="lead mb-0 mx-auto" style={{ maxWidth: '700px' }}>
            Meet the dedicated farmers who grow your food with love, care, and organic practices
          </p>
        </Container>
      </section>

      <Container className="py-5">
        {/* Search and Filter Bar */}
        <Row className="mb-4">
          <Col lg={10} className="mx-auto">
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <Row className="g-3">
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-0">
                        <FaSearch className="text-success" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Search by farm name, farmer, location, or crops..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-0 bg-light"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      type="checkbox"
                      id="organic-only"
                      label={
                        <span>
                          <FaLeaf className="text-success me-1" /> Organic Farmers
                        </span>
                      }
                      checked={filterOrganic}
                      onChange={(e) => setFilterOrganic(e.target.checked)}
                      className="mt-2"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      type="checkbox"
                      id="verified-only"
                      label={
                        <span>
                          <FaCheckCircle className="text-success me-1" /> Verified Only
                        </span>
                      }
                      checked={filterVerified}
                      onChange={(e) => setFilterVerified(e.target.checked)}
                      className="mt-2"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Results Count */}
        <Row className="mb-4">
          <Col>
            <p className="text-muted">
              Showing <strong>{filteredFarmers.length}</strong> of <strong>{farmers.length}</strong> organic farmers
            </p>
          </Col>
        </Row>

        {/* Farmers Grid */}
        {filteredFarmers.length === 0 ? (
          <Card className="shadow-sm text-center p-5 border-0">
            <img 
              src="https://img.icons8.com/fluency/96/null/no-data.png" 
              alt="No results"
              className="mx-auto mb-4"
              width="80"
            />
            <h3 className="h5 mb-3">No farmers found</h3>
            <p className="text-muted mb-4">Try adjusting your search or filters</p>
            <Button 
              variant="success" 
              onClick={() => {
                setSearchTerm('');
                setFilterOrganic(false);
                setFilterVerified(false);
              }}
              className="mx-auto px-5"
            >
              Clear Filters
            </Button>
          </Card>
        ) : (
          <Row className="g-4">
            {filteredFarmers.map((farmer) => (
              <Col key={farmer.id} lg={4} md={6}>
                <Card className="h-100 shadow-sm border-0 hover-shadow overflow-hidden">
                  {/* Cover Image */}
                  <div style={{ height: '120px', overflow: 'hidden' }}>
                    <Card.Img 
                      src={farmer.coverImage} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  
                  <Card.Body className="text-center position-relative" style={{ marginTop: '-50px' }}>
                    {/* Profile Image */}
                    <div className="position-relative d-inline-block mb-3">
                      <img
                        src={farmer.profileImage}
                        alt={farmer.name}
                        className="rounded-circle border border-4 border-white shadow"
                        width="100"
                        height="100"
                        style={{ objectFit: 'cover' }}
                      />
                      {farmer.isVerified && (
                        <FaCheckCircle 
                          className="text-success position-absolute bottom-0 end-0 bg-white rounded-circle"
                          size={24}
                        />
                      )}
                    </div>
                    
                    <h4 className="fw-bold mb-1">{farmer.farmName}</h4>
                    <p className="text-muted mb-2">{farmer.name}</p>
                    
                    {/* Rating */}
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <div className="text-warning me-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(farmer.rating) ? 'text-warning' : 'text-secondary'} />
                        ))}
                      </div>
                      <span className="text-muted small">
                        ({farmer.totalReviews} reviews)
                      </span>
                    </div>

                    {/* Location */}
                    <div className="d-flex align-items-center justify-content-center text-muted small mb-3">
                      <FaMapMarkerAlt className="text-success me-1" />
                      <span>{farmer.location}</span>
                    </div>

                    {/* Stats */}
                    <div className="row g-2 mb-3">
                      <div className="col-4">
                        <div className="bg-light p-2 rounded">
                          <div className="fw-bold text-success">{farmer.products}</div>
                          <small className="text-muted">Products</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="bg-light p-2 rounded">
                          <div className="fw-bold text-success">{farmer.landSize}</div>
                          <small className="text-muted">Acres</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="bg-light p-2 rounded">
                          <div className="fw-bold text-success">{farmer.experience}</div>
                          <small className="text-muted">Years</small>
                        </div>
                      </div>
                    </div>

                    {/* Crops */}
                    <div className="mb-3">
                      {farmer.crops.slice(0, 3).map((crop, index) => (
                        <Badge key={index} bg="success" className="me-1 mb-1">
                          {crop}
                        </Badge>
                      ))}
                      {farmer.crops.length > 3 && (
                        <Badge bg="secondary">+{farmer.crops.length - 3}</Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p className="small text-muted mb-3 line-clamp-2">
                      {farmer.description}
                    </p>

                    {/* View Profile Button */}
                    <Button 
                      as={Link} 
                      to={`/farmer/${farmer.id}`} 
                      variant="outline-success" 
                      className="w-100"
                    >
                      View Full Profile
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Farmers;