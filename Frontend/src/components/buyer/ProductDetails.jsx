import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, Row, Col, Image, Button, Badge, 
  Tabs, Tab, Table, Form, Alert, Card, Modal,
  Spinner, ProgressBar
} from 'react-bootstrap';
import { 
  FaStar, FaLeaf, FaCheckCircle, FaTruck, 
  FaShieldAlt, FaMinus, FaPlus, FaShoppingCart,
  FaSeedling, FaCalendarAlt, FaUserCheck,
  FaThumbsUp, FaFlag, FaEdit, FaTrash
} from 'react-icons/fa';
import { GiFarmer } from 'react-icons/gi';
import Loader from '../common/Loader';
import ProductCard from '../common/ProductCard';
import { addToCart } from '../../redux/slices/cartSlice';
import { productService } from '../../services/productService';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      setProduct(data);
      
      // Fetch related products (same category)
      const related = await productService.getProducts({ category: data.category });
      setRelatedProducts(related.filter(p => p._id !== id).slice(0, 4));
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      farmer: product.farmer.farmName,
      quantity,
      unit: product.unit
    }));
  };

  const incrementQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setReviewError('Please login to submit a review');
      return;
    }
    
    if (!reviewData.comment.trim()) {
      setReviewError('Please write a review');
      return;
    }
    
    try {
      setSubmitting(true);
      setReviewError('');
      
      const result = await productService.addReview(id, {
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment
      });
      
      setReviewSuccess('Review submitted successfully!');
      setShowReviewModal(false);
      setReviewData({ rating: 5, title: '', comment: '' });
      
      // Refresh product to show new review
      fetchProduct();
      
      setTimeout(() => setReviewSuccess(''), 3000);
    } catch (error) {
      setReviewError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpful = async (reviewId) => {
    try {
      await productService.markReviewHelpful(reviewId);
      fetchProduct(); // Refresh to update helpful count
    } catch (error) {
      console.error('Error marking helpful:', error);
    }
  };

  if (loading) return <Loader />;

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">Product not found</Alert>
        <Button as={Link} to="/products" variant="success">Back to Products</Button>
      </Container>
    );
  }

  const ratingDistribution = product.ratingDistribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const totalReviews = product.totalReviews || product.reviews?.length || 0;

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-light py-3">
        <Container>
          <nav>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-success">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/products" className="text-success">Products</Link></li>
              <li className="breadcrumb-item"><Link to={`/products?category=${product.category}`} className="text-success">{product.category}</Link></li>
              <li className="breadcrumb-item active">{product.name}</li>
            </ol>
          </nav>
        </Container>
      </section>

      {/* Success/Error Messages */}
      {reviewSuccess && (
        <Container className="mt-3">
          <Alert variant="success" dismissible onClose={() => setReviewSuccess('')}>
            {reviewSuccess}
          </Alert>
        </Container>
      )}

      <Container className="py-5">
        {/* Main Product Section */}
        <Row className="g-5 mb-5">
          <Col lg={6}>
            <div className="position-relative mb-3">
              <Image 
                src={product.images[selectedImage]} 
                alt={product.name}
                fluid
                className="rounded-4 shadow"
              />
              {product.organic && (
                <Badge bg="success" className="position-absolute top-0 start-0 m-3 p-3 d-flex align-items-center">
                  <FaLeaf className="me-2" /> Certified Organic
                </Badge>
              )}
            </div>
            <Row className="g-2">
              {product.images.map((img, index) => (
                <Col key={index} xs={3}>
                  <Image 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    fluid
                    className={`rounded-3 cursor-pointer ${selectedImage === index ? 'border border-3 border-success' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    style={{ height: '100px', objectFit: 'cover' }}
                  />
                </Col>
              ))}
            </Row>
          </Col>

          <Col lg={6}>
            <div className="mb-3">
              <Badge bg="light" text="dark" className="me-2">{product.category}</Badge>
              {product.subCategory && <Badge bg="light" text="dark">{product.subCategory}</Badge>}
            </div>

            <h1 className="display-6 fw-bold mb-3">{product.name}</h1>

            <Link to={`/farmer/${product.farmer._id}`} className="text-decoration-none">
              <Card className="bg-light border-0 mb-4">
                <Card.Body className="d-flex align-items-center">
                  <Image 
                    src={product.farmer.profileImage || 'https://via.placeholder.com/60'}
                    roundedCircle
                    width="60"
                    height="60"
                    className="me-3 border border-2 border-success"
                  />
                  <div>
                    <div className="d-flex align-items-center">
                      <h6 className="fw-bold mb-0 me-2">{product.farmer.farmName}</h6>
                      {product.farmer.isVerified && <FaUserCheck className="text-success" />}
                    </div>
                    <small className="text-muted d-block"><GiFarmer className="me-1" /> {product.farmer.name}</small>
                  </div>
                </Card.Body>
              </Card>
            </Link>

            {/* Rating Summary */}
            <div className="d-flex align-items-center mb-4">
              <div className="text-warning me-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-warning' : 'text-secondary'} size={20} />
                ))}
              </div>
              <span className="fw-bold me-2">{product.rating.toFixed(1)}</span>
              <span className="text-muted">({totalReviews} reviews)</span>
              {!user && (
                <Button 
                  variant="link" 
                  className="ms-3 text-success"
                  onClick={() => setShowReviewModal(true)}
                >
                  Write a Review
                </Button>
              )}
              {user && (
                <Button 
                  variant="outline-success" 
                  size="sm" 
                  className="ms-3"
                  onClick={() => setShowReviewModal(true)}
                >
                  Write a Review
                </Button>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="display-5 fw-bold text-success">₹{product.price}</span>
              <span className="text-muted ms-2">/{product.unit}</span>
              {product.originalPrice > product.price && (
                <span className="text-muted ms-2"><s>₹{product.originalPrice}</s></span>
              )}
            </div>

            {/* Quantity Selector */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Quantity ({product.unit})</Form.Label>
              <div className="d-flex align-items-center">
                <Button variant="outline-secondary" onClick={decrementQuantity} disabled={quantity <= 1} className="px-3">
                  <FaMinus />
                </Button>
                <Form.Control 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.quantity, Math.max(1, Number(e.target.value))))}
                  className="mx-3 text-center"
                  style={{ width: '80px' }}
                  min={1}
                  max={product.quantity}
                />
                <Button variant="outline-secondary" onClick={incrementQuantity} disabled={quantity >= product.quantity} className="px-3">
                  <FaPlus />
                </Button>
                <span className="ms-3 text-muted">{product.quantity} available</span>
              </div>
            </Form.Group>

            {/* Action Buttons */}
            <div className="d-flex gap-3 mb-4">
              <Button variant="success" size="lg" className="flex-grow-1 py-3 fw-bold" onClick={handleAddToCart}>
                <FaShoppingCart className="me-2" /> Add to Cart
              </Button>
              <Button variant="outline-success" size="lg" className="px-4 py-3">
                Buy Now
              </Button>
            </div>

            {/* Delivery Info */}
            <Row className="g-3">
              <Col sm={6}>
                <div className="d-flex align-items-center text-muted">
                  <FaTruck className="text-success me-2" size={20} />
                  <div><small className="d-block fw-bold">Free Delivery</small><small>Orders above ₹500</small></div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="d-flex align-items-center text-muted">
                  <FaShieldAlt className="text-success me-2" size={20} />
                  <div><small className="d-block fw-bold">7-Day Freshness</small><small>Guarantee</small></div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Product Details Tabs */}
        <Card className="shadow-sm mb-5">
          <Card.Header className="bg-white">
            <Tabs defaultActiveKey="description" className="border-0">
              <Tab eventKey="description" title="Description">
                <div className="p-4">
                  <h5 className="fw-bold mb-3">Product Description</h5>
                  <p className="mb-4">{product.longDescription || product.description}</p>
                </div>
              </Tab>
              
              <Tab eventKey="reviews" title={`Reviews (${totalReviews})`}>
                <div className="p-4">
                  {/* Rating Summary */}
                  <Row className="mb-4">
                    <Col md={4} className="text-center">
                      <div className="display-1 fw-bold text-success">{product.rating.toFixed(1)}</div>
                      <div className="text-warning mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-warning' : 'text-secondary'} size={24} />
                        ))}
                      </div>
                      <div className="text-muted">{totalReviews} ratings</div>
                    </Col>
                    <Col md={8}>
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="d-flex align-items-center mb-2">
                          <div className="me-2" style={{ width: '30px' }}>{star} ★</div>
                          <ProgressBar 
                            now={(ratingDistribution[star] / totalReviews) * 100} 
                            variant="warning" 
                            className="flex-grow-1"
                            style={{ height: '8px' }}
                          />
                          <div className="ms-2" style={{ width: '40px' }}>{ratingDistribution[star]}</div>
                        </div>
                      ))}
                    </Col>
                  </Row>

                  {/* Write Review Button */}
                  <div className="text-center mb-4">
                    <Button variant="success" onClick={() => setShowReviewModal(true)}>
                      Write a Review
                    </Button>
                  </div>

                  {/* Reviews List */}
                  {product.reviews?.length === 0 ? (
                    <div className="text-center py-5">
                      <p className="text-muted">No reviews yet. Be the first to review this product!</p>
                    </div>
                  ) : (
                    product.reviews?.map(review => (
                      <div key={review._id} className="mb-4 pb-4 border-bottom">
                        <div className="d-flex justify-content-between mb-2">
                          <div>
                            <span className="fw-bold me-2">{review.user?.name || 'Anonymous'}</span>
                            {review.verified && <Badge bg="success" size="sm" className="me-2">Verified Purchase</Badge>}
                            <div className="text-warning">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < review.rating ? 'text-warning' : 'text-secondary'} size={14} />
                              ))}
                            </div>
                          </div>
                          <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
                        </div>
                        {review.title && <h6 className="fw-bold mb-2">{review.title}</h6>}
                        <p className="mb-2">{review.comment}</p>
                        <div className="d-flex gap-3">
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-muted p-0"
                            onClick={() => handleHelpful(review._id)}
                          >
                            <FaThumbsUp className="me-1" /> Helpful ({review.helpful || 0})
                          </Button>
                          {user?.role === 'admin' && (
                            <Button variant="link" size="sm" className="text-danger p-0">
                              <FaTrash className="me-1" /> Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Tab>
            </Tabs>
          </Card.Header>
        </Card>

        {/* Related Products */}
        <section>
          <h3 className="fw-bold mb-4">You May Also Like</h3>
          <Row className="g-4">
            {relatedProducts.map(product => (
              <Col key={product._id} lg={3} md={4} sm={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>

      {/* Review Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!user ? (
            <Alert variant="warning">
              Please <Link to="/login">login</Link> to write a review.
            </Alert>
          ) : (
            <Form onSubmit={handleReviewSubmit}>
              {reviewError && <Alert variant="danger">{reviewError}</Alert>}
              
              <Form.Group className="mb-3">
                <Form.Label>Rating *</Form.Label>
                <div className="d-flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar 
                      key={star}
                      size={30}
                      className={star <= reviewData.rating ? 'text-warning cursor-pointer' : 'text-secondary cursor-pointer'}
                      onClick={() => setReviewData({...reviewData, rating: star})}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Review Title (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Summarize your experience"
                  value={reviewData.title}
                  onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Your Review *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Share your experience with this product..."
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="success" disabled={submitting}>
                  {submitting ? <Spinner as="span" animation="border" size="sm" /> : 'Submit Review'}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductDetails;