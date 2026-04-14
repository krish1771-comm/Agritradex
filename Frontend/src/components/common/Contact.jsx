import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane, FaLeaf } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        className="text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 60, 0, 0.8), rgba(0, 40, 0, 0.8)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container className="text-center py-5">
          <img 
            src="https://img.icons8.com/fluency/96/null/contact-us.png" 
            alt="Contact"
            className="mb-4"
            width="80"
          />
          <h1 className="display-3 fw-bold mb-4">Contact Us</h1>
          <p className="lead mb-0 mx-auto fs-3" style={{ maxWidth: '800px' }}>
            Get in touch with our team for any questions about organic farming, products, or partnerships
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="g-5">
          {/* Contact Information */}
          <Col lg={4}>
            <Card className="border-0 shadow-lg mb-4">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-4">Get in Touch</h4>
                
                <div className="d-flex mb-4">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                    <FaPhone className="text-success" size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Phone</h6>
                    <p className="mb-1">+91 98765 43210</p>
                    <p className="text-muted small">Mon-Fri, 9am-6pm</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                    <FaEnvelope className="text-success" size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="mb-1">support@agritradex.com</p>
                    <p className="mb-1">sales@agritradex.com</p>
                    <p className="text-muted small">24/7 Support</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                    <FaMapMarkerAlt className="text-success" size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Office</h6>
                    <p className="mb-1">123 Organic Farm Street,</p>
                    <p className="mb-1">Agricultural Hub,</p>
                    <p>Rajkot, Gujarat - 360001</p>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                    <FaClock className="text-success" size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Business Hours</h6>
                    <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-muted">Sunday: Closed</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Organic Farm Locations */}
            <Card className="border-0 shadow-lg mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Our Organic Farm Locations</h5>
                <div className="mb-3">
                  <h6 className="fw-bold text-success">🇮🇳 Punjab Region</h6>
                  <p className="text-muted small mb-2">Ludhiana, Amritsar, Jalandhar</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold text-success">🇮🇳 Maharashtra Region</h6>
                  <p className="text-muted small mb-2">Nasik, Pune, Ratnagiri</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold text-success">🇮🇳 Gujarat Region</h6>
                  <p className="text-muted small mb-2">Rajkot, Ahmedabad, Surat</p>
                </div>
                <div>
                  <h6 className="fw-bold text-success">🇮🇳 South India</h6>
                  <p className="text-muted small mb-2">Karnataka, Tamil Nadu, Kerala</p>
                </div>
              </Card.Body>
            </Card>

            {/* Social Media */}
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Follow Us</h5>
                <div className="d-flex gap-3">
                  <a href="#" className="bg-success bg-opacity-10 rounded-circle p-3 text-success text-decoration-none">
                    <FaFacebook size={24} />
                  </a>
                  <a href="#" className="bg-success bg-opacity-10 rounded-circle p-3 text-success text-decoration-none">
                    <FaTwitter size={24} />
                  </a>
                  <a href="#" className="bg-success bg-opacity-10 rounded-circle p-3 text-success text-decoration-none">
                    <FaInstagram size={24} />
                  </a>
                  <a href="#" className="bg-success bg-opacity-10 rounded-circle p-3 text-success text-decoration-none">
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col lg={8}>
            <Card className="border-0 shadow-lg">
              <Card.Header className="bg-white border-0 pt-4">
                <h4 className="fw-bold mb-0">Send us a Message</h4>
                <p className="text-muted mb-0">We'll get back to you within 24 hours</p>
              </Card.Header>
              <Card.Body className="p-4">
                {submitted && (
                  <Alert variant="success" className="mb-4">
                    <Alert.Heading>Message Sent Successfully!</Alert.Heading>
                    <p>Thank you for contacting us. Our team will respond to your query within 24 hours.</p>
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger" className="mb-4" onClose={() => setError('')} dismissible>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Label className="fw-bold">Your Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                          size="lg"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Label className="fw-bold">Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          size="lg"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={12} className="mb-4">
                      <Form.Group>
                        <Form.Label className="fw-bold">Subject *</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          required
                          size="lg"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={12} className="mb-4">
                      <Form.Group>
                        <Form.Label className="fw-bold">Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          placeholder="Type your message here..."
                          required
                          size="lg"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={12}>
                      <Button 
                        type="submit" 
                        variant="success" 
                        size="lg" 
                        className="px-5"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="me-2" /> Send Message
                          </>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>

                {/* Organic Promise */}
                <div className="bg-light p-4 rounded-3 mt-5">
                  <div className="d-flex align-items-center">
                    <FaLeaf className="text-success me-3" size={32} />
                    <div>
                      <h5 className="fw-bold mb-1">Our Organic Promise</h5>
                      <p className="mb-0 text-muted">
                        We're committed to supporting organic farmers and providing you with the freshest, 
                        chemical-free produce. Every message helps us serve you better.
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Map Section */}
        <section className="mt-5">
          <Card className="border-0 shadow-lg overflow-hidden">
            <Card.Body className="p-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234700.685890666!2d70.70240455!3d22.27347195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cabc3%3A0x8710bed5aa6fbba!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710249600000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="AgriTradeX Location"
              />
            </Card.Body>
          </Card>
        </section>

        {/* FAQ Teaser */}
        <section className="mt-5 text-center">
          <Card className="border-0 shadow-lg bg-light">
            <Card.Body className="p-5">
              <img 
                src="https://img.icons8.com/fluency/96/null/faq.png" 
                alt="FAQ"
                className="mb-4"
                width="64"
              />
              <h3 className="fw-bold mb-3">Frequently Asked Questions</h3>
              <p className="lead mb-4">
                Find quick answers to common questions about organic products, farming, and deliveries.
              </p>
              <Button as={Link} to="/faq" variant="success" size="lg" className="px-5">
                View FAQs
              </Button>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </>
  );
};

export default Contact;