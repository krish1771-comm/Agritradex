import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import { FaLeaf, FaUpload, FaTimes, FaPlus } from 'react-icons/fa';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024;
      
      if (!isValidType) alert(`${file.name} is not an image file`);
      if (!isValidSize) alert(`${file.name} is too large (max 5MB)`);
      
      return isValidType && isValidSize;
    });

    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (images.length === 0) {
      alert('Please upload at least one product image');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert('Product added successfully!');
      navigate('/farmer/my-products');
    }, 2000);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h4 className="mb-0 fw-bold">Add New Product</h4>
              <p className="text-muted small mb-0">List your agricultural product to start selling</p>
            </Card.Header>
            
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Basic Information */}
                <h5 className="mb-3 pb-2 border-bottom">Basic Information</h5>
                
                <Row className="mb-4">
                  <Col md={12} className="mb-3">
                    <Form.Group controlId="name">
                      <Form.Label>Product Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Organic Basmati Rice"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter product name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="category">
                      <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
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
                      <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                        placeholder="Describe your product, its quality, growing conditions, etc."
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter product description.
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Minimum 20 characters recommended
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Pricing & Inventory */}
                <h5 className="mb-3 pb-2 border-bottom">Pricing & Inventory</h5>
                
                <Row className="mb-4">
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="price">
                      <Form.Label>Price (₹) <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter price.
                      </Form.Control.Feedback>
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
                      <Form.Label>Available Quantity <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="0"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter available quantity.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="minOrderQuantity">
                      <Form.Label>Minimum Order Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        name="minOrderQuantity"
                        value={formData.minOrderQuantity}
                        onChange={handleChange}
                        min="1"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="organic">
                      <Form.Check
                        type="checkbox"
                        name="organic"
                        label={
                          <span className="d-flex align-items-center">
                            <FaLeaf className="text-success me-1" />
                            This is an organic product
                          </span>
                        }
                        checked={formData.organic}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Harvest Information */}
                <h5 className="mb-3 pb-2 border-bottom">Harvest Information</h5>
                
                <Row className="mb-4">
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="harvestDate">
                      <Form.Label>Harvest Date <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="date"
                        name="harvestDate"
                        value={formData.harvestDate}
                        onChange={handleChange}
                        required
                        max={new Date().toISOString().split('T')[0]}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select harvest date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="expiryDate">
                      <Form.Label>Expiry Date (if applicable)</Form.Label>
                      <Form.Control
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        min={formData.harvestDate}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Product Images */}
                <h5 className="mb-3 pb-2 border-bottom">
                  Product Images <span className="text-danger">*</span>
                </h5>
                
                <Row className="mb-4">
                  <Col md={12}>
                    <div className="border-2 border-dashed rounded-3 p-4 text-center bg-light mb-3">
                      <FaUpload className="text-muted mb-2" size={32} />
                      <p className="mb-2">Drag & drop images here or click to browse</p>
                      <p className="small text-muted mb-3">Supported: JPG, PNG, GIF (Max 5MB each)</p>
                      
                      <Form.Group controlId="imageUpload">
                        <Form.Control
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="d-none"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => document.getElementById('imageUpload').click()}
                        >
                          Choose Images
                        </Button>
                      </Form.Group>
                    </div>

                    {images.length > 0 && (
                      <div>
                        <p className="small fw-bold mb-2">{images.length} image(s) selected</p>
                        <Row className="g-2">
                          {images.map((image, index) => (
                            <Col key={index} xs={6} sm={4} md={3}>
                              <div className="position-relative">
                                <img
                                  src={image.preview}
                                  alt={`Preview ${index + 1}`}
                                  className="w-100 rounded-3"
                                  style={{ height: '100px', objectFit: 'cover' }}
                                />
                                <Button
                                  variant="danger"
                                  size="sm"
                                  className="position-absolute top-0 end-0 m-1 rounded-circle p-0"
                                  style={{ width: '24px', height: '24px' }}
                                  onClick={() => removeImage(index)}
                                >
                                  <FaTimes size={12} />
                                </Button>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}
                  </Col>
                </Row>

                {/* Availability */}
                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group controlId="isAvailable">
                      <Form.Check
                        type="checkbox"
                        name="isAvailable"
                        label={
                          <div>
                            <span className="fw-bold">Available for sale immediately</span>
                            <div className="small text-muted">Uncheck this if you want to save as draft</div>
                          </div>
                        }
                        checked={formData.isAvailable}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Form Actions */}
                <div className="d-flex justify-content-end gap-3 pt-3 border-top">
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate('/farmer/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="success"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <FaPlus className="me-2" />
                        Add Product
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

export default AddProduct;