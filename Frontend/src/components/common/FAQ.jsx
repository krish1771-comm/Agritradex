import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaLeaf, FaTractor, FaShoppingBag, FaUserShield, FaTruck } from 'react-icons/fa';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    { id: 'all', name: 'All Questions', icon: '📋' },
    { id: 'general', name: 'General', icon: '🌱' },
    { id: 'buyers', name: 'For Buyers', icon: '🛒' },
    { id: 'farmers', name: 'For Farmers', icon: '🚜' },
    { id: 'organic', name: 'Organic', icon: '🌿' },
    { id: 'delivery', name: 'Delivery', icon: '🚚' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: 'What is AgriTradeX?',
      answer: 'AgriTradeX is a platform that connects organic farmers directly with consumers. We provide a marketplace where farmers can list their chemical-free products, and buyers can purchase fresh, organic produce directly from the source.'
    },
    {
      id: 2,
      category: 'general',
      question: 'How do I register on AgriTradeX?',
      answer: 'Click on the "Sign Up" button on the top right corner. You can choose to register as a Buyer or Farmer. Fill in your details, verify your email, and you\'re ready to start! Farmers will need to provide KYC documents for verification.'
    },
    {
      id: 3,
      category: 'general',
      question: 'Is AgriTradeX free to use?',
      answer: 'Registration is free for both buyers and farmers. Farmers pay a small commission of 5% on successful orders to help maintain and improve the platform. Buyers pay no additional fees.'
    },
    {
      id: 4,
      category: 'buyers',
      question: 'How do I place an order?',
      answer: 'Browse products, add items to your cart, and proceed to checkout. Fill in your delivery address and choose a payment method (COD, Card, UPI, or Net Banking). Confirm your order and you\'re done!'
    },
    {
      id: 5,
      category: 'buyers',
      question: 'What payment methods are accepted?',
      answer: 'We accept multiple payment methods: Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD). All online payments are processed securely.'
    },
    {
      id: 6,
      category: 'buyers',
      question: 'How can I track my order?',
      answer: 'Log in to your account and go to "My Orders" section. You\'ll see real-time updates on your order status - from confirmation to packing to out for delivery to delivered.'
    },
    {
      id: 7,
      category: 'farmers',
      question: 'How do I become a seller?',
      answer: 'Register as a Farmer and complete your profile with KYC documents (Aadhar, PAN). Once verified (usually within 24-48 hours), you can start listing your organic products.'
    },
    {
      id: 8,
      category: 'farmers',
      question: 'How much commission does AgriTradeX charge?',
      answer: 'We charge a minimal platform fee of 5% on successful orders. This helps us maintain the platform, provide customer support, and develop new features for our farming community.'
    },
    {
      id: 9,
      category: 'farmers',
      question: 'When do I get paid?',
      answer: 'Payments are processed within 3-5 business days after successful order delivery. You can track your earnings and payment history in the Farmer Dashboard.'
    },
    {
      id: 10,
      category: 'organic',
      question: 'How do you verify organic products?',
      answer: 'All farmers must provide valid organic certifications (India Organic, USDA Organic, etc.) during registration. We also conduct periodic random checks and encourage customer feedback to maintain quality.'
    },
    {
      id: 11,
      category: 'organic',
      question: 'What does "Certified Organic" mean?',
      answer: 'Certified Organic means the product is grown without synthetic pesticides, chemical fertilizers, or GMOs. It follows strict government standards and is verified by accredited certifying bodies.'
    },
    {
      id: 12,
      category: 'delivery',
      question: 'What are the delivery charges?',
      answer: 'Delivery is free for orders above ₹500. For orders below ₹500, a nominal delivery fee of ₹50 applies. We ensure your organic products reach you fresh within 24-48 hours.'
    },
    {
      id: 13,
      category: 'delivery',
      question: 'Do you deliver to my city?',
      answer: 'We currently deliver to 15 major cities across India including Mumbai, Delhi, Bangalore, Ahmedabad, Pune, Chennai, Kolkata, Jaipur, Lucknow, and more. Check at checkout for your pincode.'
    },
    {
      id: 14,
      category: 'delivery',
      question: 'What is your return policy?',
      answer: 'If you receive damaged or unsatisfactory products, you can request a return within 24 hours of delivery. We\'ll either replace the product or issue a full refund after verification.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero Section */}
      <section 
        className="text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 60, 0, 0.8), rgba(0, 40, 0, 0.8)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container className="text-center py-5">
          <img 
            src="https://img.icons8.com/fluency/96/null/faq.png" 
            alt="FAQ"
            className="mb-4"
            width="80"
          />
          <h1 className="display-3 fw-bold mb-4">Frequently Asked Questions</h1>
          <p className="lead mb-0 mx-auto fs-3" style={{ maxWidth: '800px' }}>
            Find answers to common questions about organic farming, products, and our platform
          </p>
        </Container>
      </section>

      <Container className="py-5">
        {/* Search Bar */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <InputGroup size="lg">
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch className="text-success" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search your question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-start-0 ps-0"
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Category Tabs */}
        <Row className="mb-5">
          <Col>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {faqCategories.map(cat => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? 'success' : 'outline-success'}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-2"
                >
                  <span className="me-2">{cat.icon}</span>
                  {cat.name}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* FAQ Accordion */}
        <Row className="justify-content-center">
          <Col lg={10}>
            {filteredFaqs.length === 0 ? (
              <Card className="border-0 shadow-sm text-center p-5">
                <img 
                  src="https://img.icons8.com/fluency/96/null/no-data.png" 
                  alt="No results"
                  className="mx-auto mb-4"
                  width="80"
                />
                <h4 className="mb-3">No matching questions found</h4>
                <p className="text-muted mb-4">Try different keywords or browse by category</p>
                <Button 
                  variant="success" 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="mx-auto px-5"
                >
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <Accordion defaultActiveKey="0" className="shadow-sm">
                {filteredFaqs.map((faq, index) => (
                  <Accordion.Item key={faq.id} eventKey={index.toString()}>
                    <Accordion.Header className="bg-white">
                      <div className="d-flex align-items-center">
                        <span className="me-3 text-success fs-5">
                          {faq.category === 'general' && '🌱'}
                          {faq.category === 'buyers' && '🛒'}
                          {faq.category === 'farmers' && '🚜'}
                          {faq.category === 'organic' && '🌿'}
                          {faq.category === 'delivery' && '🚚'}
                        </span>
                        <span className="fw-bold">{faq.question}</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="bg-light">
                      <p className="mb-3">{faq.answer}</p>
                      <div className="d-flex justify-content-end">
                        <small className="text-muted">
                          Category: <Badge bg="success">{faq.category}</Badge>
                        </small>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </Col>
        </Row>

        {/* Still Have Questions */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-lg bg-success text-white">
              <Card.Body className="p-5 text-center">
                <img 
                  src="https://img.icons8.com/fluency/96/null/ask-question.png" 
                  alt="Questions"
                  className="mb-4"
                  width="64"
                />
                <h3 className="fw-bold mb-3">Still Have Questions?</h3>
                <p className="lead mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <Button as={Link} to="/contact" variant="light" size="lg" className="px-5">
                  Contact Support
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Stats */}
        <Row className="mt-5 g-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm text-center">
              <Card.Body>
                <FaLeaf className="text-success mb-3" size={40} />
                <h3 className="fw-bold mb-2">500+</h3>
                <p className="text-muted mb-0">Organic Farmers</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm text-center">
              <Card.Body>
                <FaShoppingBag className="text-success mb-3" size={40} />
                <h3 className="fw-bold mb-2">10k+</h3>
                <p className="text-muted mb-0">Happy Customers</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm text-center">
              <Card.Body>
                <FaTruck className="text-success mb-3" size={40} />
                <h3 className="fw-bold mb-2">15</h3>
                <p className="text-muted mb-0">Cities Covered</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm text-center">
              <Card.Body>
                <FaUserShield className="text-success mb-3" size={40} />
                <h3 className="fw-bold mb-2">24/7</h3>
                <p className="text-muted mb-0">Support Available</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FAQ;