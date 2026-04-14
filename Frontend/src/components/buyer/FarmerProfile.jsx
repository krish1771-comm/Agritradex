import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { FaStar, FaCheckCircle, FaMapMarkerAlt, FaLeaf, FaArrowLeft } from 'react-icons/fa';
import ProductCard from '../common/ProductCard';
import Loader from '../common/Loader';

const FarmerProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const farmerData = {
        id: 1,
        name: 'Harpreet Singh',
        farmName: 'Singh Farms',
        email: 'harpreet@singhfarms.com',
        phone: '9876543210',
        location: 'Ludhiana, Punjab',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
        coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200',
        rating: 4.8,
        totalReviews: 156,
        isVerified: true,
        verifiedSince: '2024-01-15',
        products: 24,
        landSize: 25,
        experience: 15,
        crops: ['Rice', 'Wheat', 'Vegetables'],
        description: 'Singh Farms has been providing organic produce for over 15 years. We believe in sustainable farming and chemical-free agriculture.',
        address: {
          street: '456 Farm Road',
          city: 'Ludhiana',
          state: 'Punjab',
          pincode: '141001'
        },
        certifications: ['Organic India', 'Fair Trade'],
        reviews: [
          { id: 1, user: 'Rajesh Kumar', rating: 5, comment: 'Excellent quality rice!', date: '2024-03-10' },
          { id: 2, user: 'Priya Sharma', rating: 4, comment: 'Fresh vegetables, timely delivery.', date: '2024-03-08' },
          { id: 3, user: 'Amit Patel', rating: 5, comment: 'Best organic farm in Punjab!', date: '2024-03-05' }
        ]
      };

      const farmerProducts = [
        {
          _id: '1',
          name: 'Organic Basmati Rice',
          price: 120,
          unit: 'kg',
          images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300'],
          farmer: { _id: '1', name: 'Harpreet Singh', farmName: 'Singh Farms' },
          rating: 4.5,
          organic: true,
          harvestDate: new Date().toISOString(),
          quantity: 50,
          category: 'Grains',
          reviews: [1, 2, 3]
        },
        {
          _id: '2',
          name: 'Organic Wheat Flour',
          price: 65,
          unit: 'kg',
          images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300'],
          farmer: { _id: '1', name: 'Harpreet Singh', farmName: 'Singh Farms' },
          rating: 4.3,
          organic: true,
          harvestDate: new Date().toISOString(),
          quantity: 100,
          category: 'Grains',
          reviews: [1, 2]
        },
        {
          _id: '3',
          name: 'Fresh Spinach',
          price: 30,
          unit: 'bunch',
          images: ['https://images.unsplash.com/photo-1576045057999-568f588f82fb?w=300'],
          farmer: { _id: '1', name: 'Harpreet Singh', farmName: 'Singh Farms' },
          rating: 4.0,
          organic: true,
          harvestDate: new Date().toISOString(),
          quantity: 75,
          category: 'Vegetables',
          reviews: [1]
        }
      ];

      setFarmer(farmerData);
      setProducts(farmerProducts);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!farmer) {
    return (
      <Container className="py-5 text-center">
        <h3>Farmer not found</h3>
        <Button as={Link} to="/farmers" variant="success" className="mt-3">
          Back to Farmers
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Cover Image */}
      <div className="position-relative" style={{ height: '300px', overflow: 'hidden' }}>
        <img
          src={farmer.coverImage}
          alt="Farm cover"
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-30"></div>
        
        {/* Back Button */}
        <Button 
          as={Link} 
          to="/farmers" 
          variant="light" 
          className="position-absolute top-0 start-0 m-4"
        >
          <FaArrowLeft className="me-2" /> Back to Farmers
        </Button>
      </div>

      <Container className="py-5" style={{ marginTop: '-100px' }}>
        {/* Profile Header */}
        <Row className="mb-5">
          <Col md={8} className="mx-auto">
            <Card className="shadow-sm border-0 text-center">
              <Card.Body>
                <div className="position-relative d-inline-block mb-3" style={{ marginTop: '-75px' }}>
                  <img
                    src={farmer.profileImage}
                    alt={farmer.name}
                    className="rounded-circle border border-4 border-white shadow"
                    width="150"
                    height="150"
                    style={{ objectFit: 'cover' }}
                  />
                  {farmer.isVerified && (
                    <FaCheckCircle 
                      className="text-success position-absolute bottom-0 end-0 bg-white rounded-circle"
                      size={30}
                    />
                  )}
                </div>
                
                <h2 className="fw-bold mb-1">{farmer.farmName}</h2>
                <p className="text-muted mb-2">{farmer.name}</p>
                
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <div className="text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(farmer.rating) ? 'text-warning' : 'text-secondary'} />
                    ))}
                  </div>
                  <span className="text-muted">
                    {farmer.rating} ({farmer.totalReviews} reviews)
                  </span>
                </div>

                {farmer.isVerified && (
                  <Badge bg="success" className="mb-3 px-3 py-2">
                    ✓ Verified Farmer since {farmer.verifiedSince}
                  </Badge>
                )}

                <div className="d-flex justify-content-center gap-4 mb-4">
                  <div>
                    <div className="fw-bold text-success">{farmer.products}</div>
                    <small className="text-muted">Products</small>
                  </div>
                  <div>
                    <div className="fw-bold text-success">{farmer.landSize} acres</div>
                    <small className="text-muted">Land</small>
                  </div>
                  <div>
                    <div className="fw-bold text-success">{farmer.experience} yrs</div>
                    <small className="text-muted">Experience</small>
                  </div>
                </div>

                <p className="text-muted mb-4">{farmer.description}</p>

                <div className="d-flex justify-content-center gap-3">
                  <Button variant="success">Contact Farmer</Button>
                  <Button variant="outline-success">View Products</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Farm Details */}
        <Row className="mb-5">
          <Col md={4}>
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0 fw-bold">Farm Information</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <small className="text-muted d-block">Location</small>
                  <div className="d-flex align-items-center">
                    <FaMapMarkerAlt className="text-success me-2" />
                    <span>{farmer.address.street}, {farmer.address.city}, {farmer.address.state} - {farmer.address.pincode}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted d-block">Contact</small>
                  <p className="mb-1"><strong>Email:</strong> {farmer.email}</p>
                  <p><strong>Phone:</strong> {farmer.phone}</p>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted d-block">Crops Grown</small>
                  <div>
                    {farmer.crops.map((crop, index) => (
                      <Badge key={index} bg="success" className="me-1 mb-1">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <small className="text-muted d-block">Certifications</small>
                  {farmer.certifications.map((cert, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <FaLeaf className="text-success me-2" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Products from this Farmer</h5>
                <Button as={Link} to={`/products?farmer=${farmer.id}`} variant="link" className="text-success">
                  View All →
                </Button>
              </Card.Header>
              <Card.Body>
                <Row className="g-4">
                  {products.map(product => (
                    <Col key={product._id} md={4}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Reviews */}
        <Row>
          <Col md={8} className="mx-auto">
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0 fw-bold">Customer Reviews</h5>
              </Card.Header>
              <Card.Body>
                {farmer.reviews.map(review => (
                  <div key={review.id} className="mb-4 pb-4 border-bottom">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">{review.user}</span>
                      <small className="text-muted">{review.date}</small>
                    </div>
                    <div className="text-warning mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? 'text-warning' : 'text-secondary'} />
                      ))}
                    </div>
                    <p className="mb-0">{review.comment}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FarmerProfile;