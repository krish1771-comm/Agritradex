import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Card, Badge, Table } from 'react-bootstrap';
import { 
  FaStar, FaCheckCircle, FaMapMarkerAlt, FaLeaf, 
  FaArrowLeft, FaEnvelope, FaPhone, FaCalendarAlt,
  FaTractor, FaSeedling, FaAward
} from 'react-icons/fa';
import { GiFarmer, GiWheat, GiFruitTree, GiCow } from 'react-icons/gi';
import ProductCard from '../common/ProductCard';
import Loader from '../common/Loader';

const PublicFarmerProfile = () => {
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
        farmName: 'Singh Organic Farms',
        email: 'harpreet@singhorganic.com',
        phone: '+91 98765 43210',
        location: 'Ludhiana, Punjab',
        address: 'Village Fatehgarh, Tehsil Jagraon, Ludhiana District, Punjab - 142026',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200',
        rating: 4.8,
        totalReviews: 156,
        isVerified: true,
        verifiedSince: '2024-01-15',
        isOrganic: true,
        organicSince: '2010',
        products: 24,
        landSize: 25,
        experience: 15,
        crops: ['Organic Rice', 'Organic Wheat', 'Organic Vegetables', 'Organic Pulses'],
        description: 'Third-generation organic farmers practicing sustainable agriculture since 1985. We believe in working with nature, not against it.',
        longDescription: 'Singh Organic Farms has been at the forefront of the organic farming movement in Punjab. We started our organic journey in 2010 and have since converted our entire 25-acre farm to certified organic production. Our farming practices focus on soil health, biodiversity, and traditional seed preservation. We use only natural fertilizers like vermicompost and cow dung, and practice crop rotation to maintain soil fertility.',
        certifications: [
          'India Organic',
          'USDA Organic',
          'Fair Trade Certified',
          'Non-GMO Verified'
        ],
        awards: [
          'Best Organic Farmer - Punjab 2023',
          'Sustainable Agriculture Award 2022',
          'Organic Excellence Award 2021'
        ],
        foundingYear: 1985,
        members: 5,
        farmImages: [
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
          'https://images.unsplash.com/photo-1500937386664-56d1dfef385e?w=800',
          'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800'
        ],
        reviews: [
          { 
            id: 1, 
            user: 'Rajesh Kumar', 
            rating: 5, 
            comment: 'Best organic farm in Punjab! Their rice is amazing.',
            date: '2024-03-10',
            product: 'Organic Basmati Rice'
          },
          { 
            id: 2, 
            user: 'Priya Sharma', 
            rating: 5, 
            comment: 'Fresh vegetables, timely delivery. Highly recommended!',
            date: '2024-03-08',
            product: 'Mixed Vegetables'
          },
          { 
            id: 3, 
            user: 'Amit Patel', 
            rating: 4, 
            comment: 'Good quality products. Customer service is excellent.',
            date: '2024-03-05',
            product: 'Organic Wheat Flour'
          }
        ]
      };

      const farmerProducts = [
        {
          _id: 'p1',
          name: 'Organic Basmati Rice',
          price: 120,
          unit: 'kg',
          images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'],
          farmer: { farmName: 'Singh Organic Farms' },
          rating: 4.5,
          organic: true,
          quantity: 50,
          category: 'Grains',
          reviews: 24
        },
        {
          _id: 'p2',
          name: 'Organic Wheat Flour',
          price: 65,
          unit: 'kg',
          images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600'],
          farmer: { farmName: 'Singh Organic Farms' },
          rating: 4.2,
          organic: true,
          quantity: 75,
          category: 'Grains',
          reviews: 15
        },
        {
          _id: 'p3',
          name: 'Organic Spinach',
          price: 30,
          unit: 'bunch',
          images: ['https://images.unsplash.com/photo-1576045057999-568f588f82fb?w=600'],
          farmer: { farmName: 'Singh Organic Farms' },
          rating: 4.0,
          organic: true,
          quantity: 100,
          category: 'Vegetables',
          reviews: 9
        },
        {
          _id: 'p4',
          name: 'Organic Tomatoes',
          price: 40,
          unit: 'kg',
          images: ['https://images.unsplash.com/photo-1597362921503-6c03e9c0f6a6?w=600'],
          farmer: { farmName: 'Singh Organic Farms' },
          rating: 4.3,
          organic: true,
          quantity: 60,
          category: 'Vegetables',
          reviews: 12
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

  return (
    <>
      {/* Cover Image */}
      <div className="position-relative" style={{ height: '400px', overflow: 'hidden' }}>
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
          className="position-absolute top-0 start-0 m-4 shadow"
        >
          <FaArrowLeft className="me-2" /> Back to Farmers
        </Button>
      </div>

      <Container className="py-5" style={{ marginTop: '-150px' }}>
        {/* Profile Header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <Card.Body className="p-5 text-center">
                <div className="position-relative d-inline-block mb-4" style={{ marginTop: '-100px' }}>
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
                      size={32}
                    />
                  )}
                </div>
                
                <h1 className="display-6 fw-bold mb-2">{farmer.farmName}</h1>
                <p className="h5 text-muted mb-3">
                  <GiFarmer className="me-2" /> {farmer.name}
                </p>
                
                {/* Badges */}
                <div className="mb-4">
                  {farmer.isOrganic && (
                    <Badge bg="success" className="me-2 px-3 py-2">
                      <FaLeaf className="me-1" /> Certified Organic Farm
                    </Badge>
                  )}
                  {farmer.isVerified && (
                    <Badge bg="info" className="px-3 py-2">
                      <FaCheckCircle className="me-1" /> Verified Farmer
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <div className="text-warning me-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(farmer.rating) ? 'text-warning' : 'text-secondary'} size={24} />
                    ))}
                  </div>
                  <span className="h5 fw-bold mb-0 me-2">{farmer.rating}</span>
                  <span className="text-muted">({farmer.totalReviews} reviews)</span>
                </div>

                {/* Quick Stats */}
                <Row className="g-3 mb-4">
                  <Col xs={4}>
                    <div className="bg-light p-3 rounded-3">
                      <FaSeedling className="text-success mb-2" size={24} />
                      <div className="fw-bold">{farmer.organicSince}</div>
                      <small className="text-muted">Organic Since</small>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="bg-light p-3 rounded-3">
                      <GiWheat className="text-success mb-2" size={24} />
                      <div className="fw-bold">{farmer.products}</div>
                      <small className="text-muted">Products</small>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="bg-light p-3 rounded-3">
                      <FaTractor className="text-success mb-2" size={24} />
                      <div className="fw-bold">{farmer.landSize} acres</div>
                      <small className="text-muted">Farm Size</small>
                    </div>
                  </Col>
                </Row>

                {/* Location */}
                <div className="d-flex align-items-center justify-content-center text-muted mb-4">
                  <FaMapMarkerAlt className="text-success me-2" />
                  <span>{farmer.location}</span>
                </div>

                {/* Description */}
                <p className="lead mb-4">{farmer.description}</p>
                
                {/* Contact Buttons */}
                <div className="d-flex gap-3 justify-content-center">
                  <Button variant="success" size="lg" className="px-5">
                    <FaEnvelope className="me-2" /> Contact Farmer
                  </Button>
                  <Button variant="outline-success" size="lg">
                    <FaPhone className="me-2" /> Call Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Farm Details */}
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Header className="bg-white border-0 pt-4">
                <h5 className="fw-bold mb-0">Farm Information</h5>
              </Card.Header>
              <Card.Body>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className="fw-bold">Established:</td>
                      <td>{farmer.foundingYear}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Experience:</td>
                      <td>{farmer.experience} years</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Farm Size:</td>
                      <td>{farmer.landSize} acres</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Family Members:</td>
                      <td>{farmer.members} generation farmers</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Address:</td>
                      <td>{farmer.address}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Header className="bg-white border-0 pt-4">
                <h5 className="fw-bold mb-0">Certifications</h5>
              </Card.Header>
              <Card.Body>
                {farmer.certifications.map((cert, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-3">
                    <FaAward className="text-success me-3" size={20} />
                    <span>{cert}</span>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Header className="bg-white border-0 pt-4">
                <h5 className="fw-bold mb-0">Awards & Recognition</h5>
              </Card.Header>
              <Card.Body>
                {farmer.awards.map((award, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-3">
                    <FaStar className="text-warning me-3" />
                    <span>{award}</span>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Crops Grown */}
        <Card className="shadow-sm border-0 mb-5">
          <Card.Header className="bg-white border-0 pt-4">
            <h5 className="fw-bold mb-0">Crops Grown</h5>
          </Card.Header>
          <Card.Body>
            <div className="d-flex flex-wrap gap-2">
              {farmer.crops.map((crop, idx) => (
                <Badge key={idx} bg="success" className="px-3 py-2" style={{ fontSize: '1rem' }}>
                  {crop}
                </Badge>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Farm Gallery */}
        <h3 className="fw-bold mb-4">Farm Gallery</h3>
        <Row className="g-4 mb-5">
          {farmer.farmImages.map((img, idx) => (
            <Col key={idx} md={4}>
              <img 
                src={img} 
                alt={`Farm ${idx + 1}`}
                className="w-100 rounded-4 shadow-sm"
                style={{ height: '250px', objectFit: 'cover' }}
              />
            </Col>
          ))}
        </Row>

        {/* Products Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">Products from {farmer.farmName}</h3>
          <Button as={Link} to={`/products?farmer=${farmer.id}`} variant="link" className="text-success">
            View All Products →
          </Button>
        </div>

        <Row className="g-4 mb-5">
          {products.map(product => (
            <Col key={product._id} lg={3} md={4} sm={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

        {/* Reviews Section */}
        <h3 className="fw-bold mb-4">Customer Reviews</h3>
        <Row className="g-4">
          {farmer.reviews.map(review => (
            <Col key={review.id} md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="text-warning mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'text-warning' : 'text-secondary'} />
                    ))}
                  </div>
                  <p className="mb-3">"{review.comment}"</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold mb-0">{review.user}</h6>
                      <small className="text-muted">on {review.product}</small>
                    </div>
                    <small className="text-muted">{review.date}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default PublicFarmerProfile;