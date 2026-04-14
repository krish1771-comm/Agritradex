import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaLeaf, FaTractor, FaHandsHelping, FaStar, 
  FaUsers, FaBox, FaShoppingBag, FaRupeeSign,
  FaCheckCircle, FaArrowRight, FaSeedling, FaAward,
  FaApple, FaCarrot, FaPepperHot, FaTree, FaSun,
  FaShieldAlt, FaHeart, FaGlobeAsia
} from 'react-icons/fa';
// REMOVED ALL GI ICONS - Using only Fa icons

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 60, 0, 0.8), rgba(0, 40, 0, 0.8)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef385e?w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <Container className="text-center py-5">
          <img 
            src="https://img.icons8.com/fluency/96/null/organic-food.png" 
            alt="Organic"
            className="mb-4"
            width="80"
          />
          <h1 className="display-3 fw-bold mb-4">About AgriTradeX</h1>
          <p className="lead mb-0 mx-auto fs-3" style={{ maxWidth: '900px' }}>
            Connecting organic farmers directly with consumers for fresh, chemical-free, and fair-trade agricultural products.
          </p>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <h2 className="display-6 fw-bold mb-4">Our Organic Story</h2>
              <p className="lead mb-4">
                Founded in 2024, AgriTradeX was born from a simple idea: organic farmers deserve fair prices, and consumers deserve fresh, chemical-free products.
              </p>
              <p className="mb-4">
                We started as a small initiative in Rajkot, connecting local organic farmers with urban consumers who value health and sustainability. Today, we've grown into a platform that serves thousands of farmers and customers across India, promoting sustainable and organic agriculture.
              </p>
              <div className="d-flex gap-4 mb-4">
                <div className="text-center">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 mb-2">
                    <FaLeaf className="text-success" size={32} />
                  </div>
                  <h6 className="fw-bold">100% Organic</h6>
                </div>
                <div className="text-center">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 mb-2">
                    <FaTractor className="text-success" size={32} />
                  </div>
                  <h6 className="fw-bold">Direct from Farm</h6>
                </div>
                <div className="text-center">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 mb-2">
                    <FaHandsHelping className="text-success" size={32} />
                  </div>
                  <h6 className="fw-bold">Fair Trade</h6>
                </div>
              </div>
              <Button as={Link} to="/farmers" variant="success" size="lg">
                Meet Our Farmers <FaArrowRight className="ms-2" />
              </Button>
            </Col>
            <Col lg={6}>
              <Image 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800" 
                fluid 
                rounded 
                className="shadow-lg"
                alt="Organic farming"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 border-0 shadow-lg">
                <Card.Body className="p-5">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 mb-4 d-inline-block">
                    <FaStar className="text-success" size={32} />
                  </div>
                  <h3 className="fw-bold mb-3">Our Mission</h3>
                  <p className="mb-4 fs-5">
                    To empower organic farmers with technology and provide them direct access to markets, ensuring fair prices for their chemical-free produce while delivering fresh, healthy products to consumers.
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><FaCheckCircle className="text-success me-2" /> Support 500+ organic farmers</li>
                    <li className="mb-2"><FaCheckCircle className="text-success me-2" /> Deliver to 50+ cities</li>
                    <li className="mb-2"><FaCheckCircle className="text-success me-2" /> Zero middlemen, 100% transparency</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0 shadow-lg">
                <Card.Body className="p-5">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 mb-4 d-inline-block">
                    <FaSeedling className="text-success" size={32} />
                  </div>
                  <h3 className="fw-bold mb-3">Our Vision</h3>
                  <p className="mb-4 fs-5">
                    To create a sustainable agricultural ecosystem where every organic farmer thrives, every consumer gets the freshest chemical-free produce, and the gap between farm and table is eliminated.
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><FaCheckCircle className="text-success me-2" /> 100% organic marketplace</li>
                    <li className="mb-2"><FaCheckCircle className="text-success me-2" /> Zero carbon footprint by 2030</li>
                    <li className="mb-2"><FaCheckCircle className="text-success me-2" /> Empower 10,000 farmers by 2030</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works - Role Based */}
      <section className="py-5">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5">How AgriTradeX Works</h2>
          
          <Row className="g-4">
            {/* For Buyers */}
            <Col lg={4}>
              <Card className="h-100 border-0 shadow-lg hover-shadow">
                <Card.Header className="bg-success text-white text-center py-4 border-0 rounded-top">
                  <h4 className="mb-0">For Buyers</h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <img 
                      src="https://img.icons8.com/fluency/96/null/shopping-cart.png" 
                      alt="Buyers"
                      width="80"
                    />
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Browse 100% organic products</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Shop by category: Grains, Fruits, Vegetables</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Know your farmer</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Fresh delivery in 24-48 hours</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Leave reviews and ratings</span>
                    </li>
                  </ul>
                  <Button as={Link} to="/products" variant="success" className="w-100 mt-3">
                    Shop Organic <FaArrowRight className="ms-2" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* For Farmers */}
            <Col lg={4}>
              <Card className="h-100 border-0 shadow-lg hover-shadow">
                <Card.Header className="bg-warning text-dark text-center py-4 border-0 rounded-top">
                  <h4 className="mb-0">For Farmers</h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <img 
                      src="https://img.icons8.com/fluency/96/null/farmer.png" 
                      alt="Farmers"
                      width="80"
                    />
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Free registration with KYC</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>List organic products easily</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Manage inventory and pricing</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Receive orders and track earnings</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Get paid directly (5% commission)</span>
                    </li>
                  </ul>
                  <Button as={Link} to="/register" variant="warning" className="w-100 mt-3">
                    Join as Farmer <FaArrowRight className="ms-2" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* For Admins */}
            <Col lg={4}>
              <Card className="h-100 border-0 shadow-lg hover-shadow">
                <Card.Header className="bg-info text-white text-center py-4 border-0 rounded-top">
                  <h4 className="mb-0">For Admins</h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <img 
                      src="https://img.icons8.com/fluency/96/null/admin-settings.png" 
                      alt="Admins"
                      width="80"
                    />
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Verify farmer KYC documents</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Approve organic certifications</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Manage users and products</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Monitor platform analytics</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span>Resolve disputes</span>
                    </li>
                  </ul>
                  <Button as={Link} to="/admin/dashboard" variant="info" className="w-100 mt-3 text-white">
                    Admin Dashboard <FaArrowRight className="ms-2" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Impact Stats */}
      <section className="py-5 bg-success text-white">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5">Our Organic Impact</h2>
          <Row className="text-center g-4">
            <Col md={3} sm={6}>
              <div className="display-1 fw-bold mb-2">500+</div>
              <p className="h5">Organic Farmers</p>
            </Col>
            <Col md={3} sm={6}>
              <div className="display-1 fw-bold mb-2">10k+</div>
              <p className="h5">Happy Customers</p>
            </Col>
            <Col md={3} sm={6}>
              <div className="display-1 fw-bold mb-2">50+</div>
              <p className="h5">Organic Products</p>
            </Col>
            <Col md={3} sm={6}>
              <div className="display-1 fw-bold mb-2">15</div>
              <p className="h5">States Covered</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5">Our Team</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-lg text-center h-100">
                <Card.Body className="p-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" 
                    roundedCircle 
                    width="120" 
                    height="120" 
                    className="mb-3 border border-3 border-success"
                    style={{ objectFit: 'cover' }}
                  />
                  <h5 className="fw-bold mb-1">Harpreet Singh</h5>
                  <p className="text-success mb-2">Founder & CEO</p>
                  <p className="text-muted small">
                    15+ years in organic farming and agricultural technology.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-lg text-center h-100">
                <Card.Body className="p-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1494790108777-223d9f034c0f?w=400" 
                    roundedCircle 
                    width="120" 
                    height="120" 
                    className="mb-3 border border-3 border-success"
                    style={{ objectFit: 'cover' }}
                  />
                  <h5 className="fw-bold mb-1">Priya Sharma</h5>
                  <p className="text-success mb-2">Head of Operations</p>
                  <p className="text-muted small">
                    Expert in organic supply chain and farmer relations.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-lg text-center h-100">
                <Card.Body className="p-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" 
                    roundedCircle 
                    width="120" 
                    height="120" 
                    className="mb-3 border border-3 border-success"
                    style={{ objectFit: 'cover' }}
                  />
                  <h5 className="fw-bold mb-1">Amit Patel</h5>
                  <p className="text-success mb-2">Technology Lead</p>
                  <p className="text-muted small">
                    Building tech solutions for organic agriculture.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-5 bg-light">
        <Container>
          <h3 className="text-center fw-bold mb-5">Our Organic Certifications</h3>
          <Row className="justify-content-center align-items-center g-5">
            <Col xs={4} md={2} className="text-center">
              <img 
                src="https://img.icons8.com/color/96/null/usda.png" 
                alt="USDA Organic"
                className="img-fluid"
                style={{ maxHeight: '60px' }}
              />
            </Col>
            <Col xs={4} md={2} className="text-center">
              <img 
                src="https://img.icons8.com/color/96/null/india.png" 
                alt="India Organic"
                className="img-fluid"
                style={{ maxHeight: '60px' }}
              />
            </Col>
            <Col xs={4} md={2} className="text-center">
              <img 
                src="https://img.icons8.com/color/96/null/vegan-symbol.png" 
                alt="Vegan"
                className="img-fluid"
                style={{ maxHeight: '60px' }}
              />
            </Col>
            <Col xs={4} md={2} className="text-center">
              <img 
                src="https://img.icons8.com/color/96/null/non-gmo.png" 
                alt="Non-GMO"
                className="img-fluid"
                style={{ maxHeight: '60px' }}
              />
            </Col>
            <Col xs={4} md={2} className="text-center">
              <img 
                src="https://img.icons8.com/color/96/null/fair-trade.png" 
                alt="Fair Trade"
                className="img-fluid"
                style={{ maxHeight: '60px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-success text-white">
        <Container className="text-center">
          <h2 className="display-6 fw-bold mb-4">Join the Organic Movement</h2>
          <p className="lead mb-4 fs-3">
            Whether you're a buyer looking for fresh organic produce or a farmer wanting to sell directly,
            AgriTradeX is the platform for you.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button as={Link} to="/register" variant="light" size="lg" className="px-5">
              Sign Up Now
            </Button>
            <Button as={Link} to="/contact" variant="outline-light" size="lg" className="px-5">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default About;