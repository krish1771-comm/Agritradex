import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaFilter } from 'react-icons/fa';
import ProductCard from '../common/ProductCard';
import Loader from '../common/Loader';
import { fetchProducts, setFilters, clearFilters } from '../../redux/slices/productSlice';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Products = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const { products, loading, filters } = useSelector((state) => state.products);
  
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(query.get('category') || '');
  const [selectedOrganic, setSelectedOrganic] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Spices', 'Mirchi', 'Dry Fruits'];

  useEffect(() => {
    const filterParams = {
      category: selectedCategory,
      organic: selectedOrganic,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      sort: sortBy,
      search: searchTerm,
    };
    dispatch(fetchProducts(filterParams));
  }, [dispatch, selectedCategory, selectedOrganic, priceRange, sortBy, searchTerm]);

  useEffect(() => {
    const category = query.get('category');
    if (category) setSelectedCategory(category);
  }, [query]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedOrganic(false);
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
  };

  if (loading) return <Loader />;

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold">
            {selectedCategory || 'Farm Fresh Products'}
          </h1>
          <p className="text-muted">
            {selectedCategory 
              ? `Browse our selection of fresh ${selectedCategory.toLowerCase()}`
              : 'Discover fresh, organic products directly from local farmers'}
          </p>
        </Col>
      </Row>

      {/* Search & Filters */}
      <Row className="mb-4">
        <Col lg={12}>
          <div className="bg-white p-3 rounded shadow-sm">
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Button variant="outline-secondary" className="w-100" onClick={() => setShowFilters(!showFilters)}>
                  <FaFilter className="me-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </Col>
            </Row>

            {showFilters && (
              <Row className="mt-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                      {categories.map(cat => (
                        <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Price Range</Form.Label>
                    <Row className="g-2">
                      <Col><Form.Control type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} /></Col>
                      <Col><Form.Control type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} /></Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mt-4">
                    <Form.Check type="checkbox" label="Organic Only" checked={selectedOrganic} onChange={(e) => setSelectedOrganic(e.target.checked)} />
                  </Form.Group>
                </Col>
                <Col md={3} className="d-flex align-items-end">
                  <Button variant="link" className="text-danger" onClick={clearAllFilters}>Clear Filters</Button>
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>

      {/* Products Grid */}
      {products?.length === 0 ? (
        <Row><Col className="text-center py-5"><h3>No Products Found</h3><Button variant="success" onClick={clearAllFilters}>Clear Filters</Button></Col></Row>
      ) : (
        <Row className="g-4">
          {products?.map(product => (
            <Col key={product._id} lg={3} md={4} sm={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Products;