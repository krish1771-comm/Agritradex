import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Table, Image } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaPlus, FaLeaf, FaRupeeSign, FaStar } from 'react-icons/fa';
import { fetchFarmerProducts, deleteProduct, clearError } from '../../redux/slices/productSlice';

const MyProducts = () => {
  const dispatch = useDispatch();
  const { farmerProducts, loading, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [deleting, setDeleting] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  useEffect(() => {
    if (user && (user.role === 'farmer' || user.role === 'admin')) {
      dispatch(fetchFarmerProducts());
    }
  }, [dispatch, user]);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setDeleting(productId);
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        setAlertMessage('Product deleted successfully!');
        setAlertVariant('success');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch (err) {
        setAlertMessage(err || 'Failed to delete product');
        setAlertVariant('danger');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading your products...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Products</Alert.Heading>
          <p>{error}</p>
        </Alert>
        <Button variant="success" onClick={() => dispatch(fetchFarmerProducts())}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="display-6 fw-bold">My Products</h1>
          <p className="text-muted">Manage all your listed agricultural products</p>
        </Col>
        <Col xs="auto">
          <Button as={Link} to="/farmer/add-product" variant="success" size="lg">
            <FaPlus className="me-2" /> Add New Product
          </Button>
        </Col>
      </Row>

      {/* Alert Message */}
      {showAlert && (
        <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)} className="mb-4">
          {alertMessage}
        </Alert>
      )}

      {/* Products List */}
      {!farmerProducts || farmerProducts.length === 0 ? (
        <Card className="shadow-sm text-center p-5 border-0">
          <div className="display-1 mb-3">🌱</div>
          <h3 className="h5 mb-3">No Products Yet</h3>
          <p className="text-muted mb-4">Start adding your agricultural products to sell on AgriTradeX</p>
          <Button as={Link} to="/farmer/add-product" variant="success" className="mx-auto" style={{ maxWidth: '250px' }}>
            Add Your First Product
          </Button>
        </Card>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="d-none d-md-block">
            <Card className="shadow-sm border-0">
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th style={{ width: '80px' }}>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmerProducts.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img 
                            src={product.images?.[0] || 'https://via.placeholder.com/50'} 
                            alt={product.name}
                            className="rounded"
                            width="50"
                            height="50"
                            style={{ objectFit: 'cover' }}
                          />
                        </td>
                        <td className="fw-bold">{product.name}</td>
                        <td>{product.category}</td>
                        <td className="text-success fw-bold">₹{product.price}/{product.unit}</td>
                        <td>
                          <Badge bg={product.quantity < 10 ? 'danger' : 'secondary'}>
                            {product.quantity} left
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={product.isApproved ? 'success' : 'warning'}>
                            {product.isApproved ? 'Approved' : 'Pending'}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaStar className="text-warning me-1" />
                            <span>{product.rating?.toFixed(1) || 0}</span>
                            <span className="text-muted ms-1">({product.numReviews || 0})</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              as={Link} 
                              to={`/product/${product._id}`} 
                              variant="outline-secondary" 
                              size="sm"
                              title="View Product"
                            >
                              <FaEye />
                            </Button>
                            <Button 
                              as={Link} 
                              to={`/farmer/edit-product/${product._id}`} 
                              variant="outline-primary" 
                              size="sm"
                              title="Edit Product"
                            >
                              <FaEdit />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDelete(product._id)}
                              disabled={deleting === product._id}
                              title="Delete Product"
                            >
                              {deleting === product._id ? (
                                <Spinner as="span" animation="border" size="sm" />
                              ) : (
                                <FaTrash />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>

          {/* Mobile Card View */}
          <div className="d-md-none">
            <Row className="g-4">
              {farmerProducts.map((product) => (
                <Col key={product._id} xs={12}>
                  <Card className="shadow-sm border-0">
                    <div className="position-relative">
                      <img 
                        src={product.images?.[0] || 'https://via.placeholder.com/400'} 
                        alt={product.name}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <Badge 
                        bg={product.isApproved ? 'success' : 'warning'} 
                        className="position-absolute top-0 end-0 m-2"
                      >
                        {product.isApproved ? 'Approved' : 'Pending'}
                      </Badge>
                      {product.organic && (
                        <Badge bg="success" className="position-absolute top-0 start-0 m-2">
                          <FaLeaf className="me-1" /> Organic
                        </Badge>
                      )}
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold mb-2">{product.name}</Card.Title>
                      <Card.Subtitle className="text-muted small mb-2">{product.category}</Card.Subtitle>
                      
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <span className="h5 fw-bold text-success">₹{product.price}</span>
                          <span className="text-muted ms-1">/{product.unit}</span>
                        </div>
                        <div>
                          <Badge bg={product.quantity < 10 ? 'danger' : 'secondary'}>
                            Stock: {product.quantity}
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <FaStar className="text-warning me-1" />
                          <span>{product.rating?.toFixed(1) || 0}</span>
                          <span className="text-muted ms-1">({product.numReviews || 0} reviews)</span>
                        </div>
                      </div>

                      <p className="text-muted small mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="d-flex gap-2">
                        <Button 
                          as={Link} 
                          to={`/product/${product._id}`} 
                          variant="outline-secondary" 
                          size="sm"
                          className="flex-grow-1"
                        >
                          <FaEye className="me-1" /> View
                        </Button>
                        <Button 
                          as={Link} 
                          to={`/farmer/edit-product/${product._id}`} 
                          variant="outline-primary" 
                          size="sm"
                          className="flex-grow-1"
                        >
                          <FaEdit className="me-1" /> Edit
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          className="flex-grow-1"
                          onClick={() => handleDelete(product._id)}
                          disabled={deleting === product._id}
                        >
                          {deleting === product._id ? (
                            <Spinner as="span" animation="border" size="sm" />
                          ) : (
                            <><FaTrash className="me-1" /> Delete</>
                          )}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default MyProducts;