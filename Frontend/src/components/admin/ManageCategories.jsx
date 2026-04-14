import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Table, Button, Badge, Form, Modal, Spinner, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { categoryService } from '../../services/categoryService';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    icon: '',
    displayOrder: 0,
    isActive: true
  });

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getCategories();
      setCategories(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id, formData);
        setError('');
      } else {
        await categoryService.createCategory(formData);
        setError('');
      }
      setShowModal(false);
      resetForm();
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
      icon: category.icon || '',
      displayOrder: category.displayOrder || 0,
      isActive: category.isActive !== false
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This will also delete all subcategories.')) {
      try {
        await categoryService.deleteCategory(categoryId);
        fetchCategories();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete category');
      }
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      await categoryService.updateCategory(category._id, { isActive: !category.isActive });
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update category status');
    }
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      icon: '',
      displayOrder: 0,
      isActive: true
    });
    setError('');
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading categories...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="display-6 fw-bold">Manage Categories</h1>
          <p className="text-muted">Add, edit, and organize product categories</p>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={openAddModal}>
            <FaPlus className="me-2" /> Add Category
          </Button>
        </Col>
      </Row>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')} className="mb-4">
          {error}
        </Alert>
      )}

      {/* Categories Table */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Icon</th>
                <th>Products</th>
                <th>Status</th>
                <th>Order</th>
                <th style={{ width: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <div className="text-muted">No categories found. Click "Add Category" to create one.</div>
                  </td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{category.name}</td>
                    <td>{category.description || '-'}</td>
                    <td className="text-center">
                      {category.icon ? (
                        <span className="fs-4">{category.icon}</span>
                      ) : (
                        <Badge bg="light" text="dark">None</Badge>
                      )}
                    </td>
                    <td>
                      <Badge bg="success">{category.productCount || 0}</Badge>
                    </td>
                    <td>
                      <Badge bg={category.isActive ? 'success' : 'danger'}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td>{category.displayOrder || 0}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleEdit(category)}
                          title="Edit Category"
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => handleToggleStatus(category)}
                          title={category.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {category.isActive ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(category._id)}
                          title="Delete Category"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group controlId="name">
                  <Form.Label className="fw-semibold">Category Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Grains, Fruits, Vegetables"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group controlId="description">
                  <Form.Label className="fw-semibold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Brief description of this category"
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="icon">
                  <Form.Label className="fw-semibold">Icon (Emoji or HTML)</Form.Label>
                  <Form.Control
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="e.g., 🌾, 🍎, 🥕"
                  />
                  <Form.Text className="text-muted">
                    Enter an emoji or icon code
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="displayOrder">
                  <Form.Label className="fw-semibold">Display Order</Form.Label>
                  <Form.Control
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                  <Form.Text className="text-muted">
                    Lower numbers appear first
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group controlId="image">
                  <Form.Label className="fw-semibold">Image URL (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/category-image.jpg"
                  />
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group controlId="isActive">
                  <Form.Check
                    type="checkbox"
                    name="isActive"
                    label="Active"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Inactive categories will be hidden from users
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="success" disabled={submitting}>
                {submitting ? (
                  <><Spinner as="span" animation="border" size="sm" className="me-2" /> Saving...</>
                ) : (
                  <>{editingCategory ? 'Update Category' : 'Add Category'}</>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageCategories;