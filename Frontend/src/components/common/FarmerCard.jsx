import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';
import { FaStar, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';

const FarmerCard = ({ farmer }) => {
  const {
    _id,
    name,
    farmName,
    profileImage,
    rating,
    totalReviews,
    address,
    isVerified,
    farmDetails,
    products
  } = farmer;

  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <Link to={`/farmer/${_id}`} className="text-decoration-none">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <div className="position-relative me-3">
              <img
                src={profileImage || 'https://via.placeholder.com/80x80?text=Farmer'}
                alt={name}
                className="rounded-circle border border-2 border-success"
                width="64"
                height="64"
                style={{ objectFit: 'cover' }}
              />
              {isVerified && (
                <FaCheckCircle className="position-absolute bottom-0 end-0 text-success bg-white rounded-circle" />
              )}
            </div>
            
            <div className="flex-grow-1">
              <h5 className="mb-0 text-dark">{farmName || name}</h5>
              <small className="text-muted">{name}</small>
              
              <div className="d-flex align-items-center mt-1">
                <div className="text-warning me-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(rating || 0) ? 'text-warning' : 'text-secondary'} size={12} />
                  ))}
                </div>
                <small className="text-muted">({totalReviews || 0})</small>
              </div>
            </div>
          </div>

          {address && (
            <div className="d-flex align-items-center text-muted small mb-3">
              <FaMapMarkerAlt className="text-success me-1" />
              <span>{address.city}, {address.state}</span>
            </div>
          )}

          {farmDetails && (
            <div className="row g-2 mb-3">
              <div className="col-6">
                <div className="bg-light p-2 rounded text-center">
                  <span className="fw-bold text-success">{farmDetails.landSize || 0}</span>
                  <span className="text-muted small d-block">Acres</span>
                </div>
              </div>
              <div className="col-6">
                <div className="bg-light p-2 rounded text-center">
                  <span className="fw-bold text-success">{products?.length || 0}</span>
                  <span className="text-muted small d-block">Products</span>
                </div>
              </div>
            </div>
          )}

          <Button variant="outline-success" className="w-100">
            View Profile
          </Button>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default FarmerCard;