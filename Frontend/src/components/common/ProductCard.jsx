import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaLeaf, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  if (!product) return null;

  const { _id, name, images, price, unit, farmer, rating, organic, quantity, category } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: _id,
      name,
      price,
      image: images?.[0],
      farmer: farmer?.farmName || farmer?.name,
      quantity: 1,
      unit
    }));
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Link to={`/product/${_id}`} className="text-decoration-none text-dark">
        <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
          <Card.Img variant="top" src={images?.[0]} style={{ height: '100%', objectFit: 'cover' }} />
          {organic && <Badge bg="success" className="position-absolute top-0 start-0 m-2"><FaLeaf className="me-1" /> Organic</Badge>}
          {quantity < 10 && quantity > 0 && <Badge bg="warning" className="position-absolute top-0 end-0 m-2">Only {quantity} left</Badge>}
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`} className="text-decoration-none"><Card.Title className="h6">{name}</Card.Title></Link>
        {farmer && <small className="text-success d-block mb-2">by {farmer.farmName || farmer.name}</small>}
        <div className="d-flex align-items-center mb-2">
          <div className="text-warning me-2">{[...Array(5)].map((_, i) => (<FaStar key={i} className={i < Math.floor(rating || 0) ? 'text-warning' : 'text-secondary'} size={12} />))}</div>
          <small className="text-muted">({product.numReviews || 0})</small>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div><span className="h5 fw-bold text-success">₹{price}</span><small className="text-muted ms-1">/{unit}</small></div>
          <Button variant="success" size="sm" onClick={handleAddToCart} disabled={quantity === 0} className="rounded-circle" style={{ width: '40px', height: '40px' }}><FaShoppingCart /></Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;