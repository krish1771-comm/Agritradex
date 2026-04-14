import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaLeaf, FaStar, FaTruck, FaShieldAlt, FaRupeeSign } from 'react-icons/fa';
import ProductCard from '../common/ProductCard';
import Loader from '../common/Loader';
import { fetchProducts } from '../../redux/slices/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const featuredProducts = products?.slice(0, 4) || [];

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-success text-white py-5">
        <Container className="text-center py-5">
          <h1 className="display-3 fw-bold mb-4">100% Organic<br />Farm Fresh Produce</h1>
          <p className="lead mb-5">Direct from Certified Organic Farms to Your Doorstep</p>
          <Button as={Link} to="/products" variant="warning" size="lg" className="me-3">
            Shop Now
          </Button>
          <Button as={Link} to="/farmers" variant="outline-light" size="lg">
            Meet Farmers
          </Button>
        </Container>
      </section>

      {/* Features */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="text-center display-5 fw-bold mb-5">Why Choose Organic?</h2>
          <Row className="g-4">
            <Col md={3}>
              <div className="text-center">
                <FaLeaf className="text-success mb-3" size={40} />
                <h5>100% Organic</h5>
                <p className="text-muted">Certified organic products</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <FaTruck className="text-success mb-3" size={40} />
                <h5>Free Delivery</h5>
                <p className="text-muted">On orders above ₹500</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <FaRupeeSign className="text-success mb-3" size={40} />
                <h5>Best Prices</h5>
                <p className="text-muted">Direct from farmers</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <FaShieldAlt className="text-success mb-3" size={40} />
                <h5>Quality Guarantee</h5>
                <p className="text-muted">100% satisfaction</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="display-6 fw-bold">Fresh Arrivals</h2>
            <Button as={Link} to="/products" variant="success">View All</Button>
          </div>
          
          {loading ? (
            <Loader />
          ) : (
            <Row className="g-4">
              {featuredProducts.map(product => (
                <Col key={product._id} lg={3} md={6}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default Home;