import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTractor, FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-5">
      <Container>
        <Row>
          <Col lg={3} md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <FaTractor className="text-success me-2" size={24} />
              <span className="h5 fw-bold mb-0">AgriTradeX</span>
            </div>
            <p className="text-secondary">
              Direct farm to consumer platform. Fresh, organic, and fair trade agricultural products.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-secondary hover-text-white"><FaFacebook size={20} /></a>
              <a href="#" className="text-secondary hover-text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-secondary hover-text-white"><FaInstagram size={20} /></a>
            </div>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none hover-text-white">About Us</Link></li>
              <li className="mb-2"><Link to="/products" className="text-secondary text-decoration-none hover-text-white">Products</Link></li>
              <li className="mb-2"><Link to="/farmers" className="text-secondary text-decoration-none hover-text-white">Our Farmers</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none hover-text-white">Contact</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="mb-3">For Farmers</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/farmer/register" className="text-secondary text-decoration-none hover-text-white">Join as Farmer</Link></li>
              <li className="mb-2"><Link to="/farmer/guidelines" className="text-secondary text-decoration-none hover-text-white">Selling Guidelines</Link></li>
              <li className="mb-2"><Link to="/farmer/success" className="text-secondary text-decoration-none hover-text-white">Success Stories</Link></li>
              <li className="mb-2"><Link to="/faq" className="text-secondary text-decoration-none hover-text-white">FAQ</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center text-secondary">
                <FaMapMarker className="me-2" />
                <span>123 Farm Street, Agricultural Hub, India</span>
              </li>
              <li className="mb-2 d-flex align-items-center text-secondary">
                <FaPhone className="me-2" />
                <span>+91 98765 43210</span>
              </li>
              <li className="mb-2 d-flex align-items-center text-secondary">
                <FaEnvelope className="me-2" />
                <span>support@agritradex.com</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="bg-secondary" />
        
        <div className="text-center text-secondary">
          <p className="mb-0">&copy; {new Date().getFullYear()} AgriTradeX. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;