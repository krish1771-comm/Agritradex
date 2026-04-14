import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import Loader from '../common/Loader';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables',
    description: '',
    price: '',
    unit: 'kg',
    quantity: '',
    minOrderQuantity: '1',
    organic: false,
    harvestDate: '',
    expiryDate: '',
    quality: 'A',
    isAvailable: true
  });

  useEffect(() => {
    // Simulate fetching product data
    setTimeout(() => {
      // Mock data - replace with actual API call
      setFormData({
        name: 'Organic Basmati Rice',
        category: 'grains',
        description: 'Premium quality organic basmati rice grown in the foothills of Himalayas.',
        price: '120',
        unit: 'kg',
        quantity: '50',
        minOrderQuantity: '1',
        organic: true,
        harvestDate: '2024-02-15',
        expiryDate: '2025-02-15',
        quality: 'A',
        isAvailable: true
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const categories = [
    { value: 'grains', label: 'Grains & Cereals' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'spices', label: 'Spices' },
    { value: 'dryfruits', label: 'Dry Fruits' },
    { value: 'others', label: 'Others' }
  ];

  const units = [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'gram', label: 'Gram (g)' },
    { value: 'dozen', label: 'Dozen' },
    { value: 'piece', label: 'Piece' },
    { value: 'quintal', label: 'Quintal' }
  ];

  const qualityGrades = [
    { value: 'A', label: 'Grade A - Premium' },
    { value: 'B', label: 'Grade B - Good' },
    { value: 'C', label: 'Grade C - Standard' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setSaving(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      alert('Product updated successfully!');
      navigate('/farmer/my-products');
    }, 1500);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h4 className="mb-0 fw-bold">Edit Product</h4>
              <p className="text-muted small mb-0">Product ID: {id}</p>
            </Card.Header>
            
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group controlId="name">
                      <Form.Label>Product Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="quality">
                      <Form.Label>Quality Grade</Form.Label>
                      <Form.Select
                        name="quality"
                        value={formData.quality}
                        onChange={handleChange}
                      >
                        {qualityGrades.map(grade => (
                          <option key={grade.value} value={grade.value}>{grade.label}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Group controlId="price">
                      <Form.Label>Price (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Group controlId="unit">
                      <Form.Label>Unit</Form.Label>
                      <Form.Select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                      >
                        {units.map(unit => (
                          <option key={unit.value} value={unit.value}>{unit.label}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Group controlId="quantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="harvestDate">
                      <Form.Label>Harvest Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="harvestDate"
                        value={formData.harvestDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="expiryDate">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Group controlId="organic">
                      <Form.Check
                        type="checkbox"
                        name="organic"
                        label="This is an organic product"
                        checked={formData.organic}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Group controlId="isAvailable">
                      <Form.Check
                        type="checkbox"
                        name="isAvailable"
                        label="Available for sale"
                        checked={formData.isAvailable}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-3 mt-3">
                  <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                    <FaTimes className="me-2" /> Cancel
                  </Button>
                  <Button type="submit" variant="success" disabled={saving}>
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;