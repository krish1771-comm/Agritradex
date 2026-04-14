import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaHome, FaLeaf } from 'react-icons/fa';

const NotFound = () => {
  return (
    <Container className="py-5 min-vh-100 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6} className="text-center">
          <img 
            src="https://img.icons8.com/fluency/96/null/error.png" 
            alt="404 Error"
            className="mb-4"
            width="120"
          />
          <h1 className="display-1 fw-bold text-success">404</h1>
          <h2 className="display-6 fw-bold mb-4">Page Not Found</h2>
          <p className="lead mb-5 text-muted">
            Oops! The page you're looking for doesn't exist or has been moved to another field.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button as={Link} to="/" variant="success" size="lg" className="px-5">
              <FaHome className="me-2" /> Back to Home
            </Button>
            <Button as={Link} to="/products" variant="outline-success" size="lg" className="px-5">
              <FaLeaf className="me-2" /> Shop Organic
            </Button>
          </div>
          
          {/* Organic Farm Image */}
          <div className="mt-5">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800" 
              alt="Organic Farm"
              className="img-fluid rounded-4 shadow"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;