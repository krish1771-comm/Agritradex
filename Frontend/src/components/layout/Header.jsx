import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBox, FaHeart, FaSignOutAlt, FaLeaf } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  // This would come from your auth context/state management
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Change this based on actual auth state
  const [cartCount, setCartCount] = useState(3); // This would come from cart state
  
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'buyer' // 'buyer' or 'farmer'
  };

  const handleLogout = () => {
    // Add logout logic here
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center">
          <FaLeaf className="me-2" />
          FarmFresh
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
            <Nav.Link as={Link} to="/products" className="px-3">Products</Nav.Link>
            <Nav.Link as={Link} to="/about" className="px-3">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="px-3">Contact</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative px-3">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{ fontSize: '0.7rem' }}
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            
            {isAuthenticated ? (
              <NavDropdown 
                title={
                  <span className="d-flex align-items-center">
                    <FaUser className="me-1" /> 
                    {user.name.split(' ')[0]}
                  </span>
                } 
                id="user-dropdown"
                align="end"
                className="fw-medium"
              >
                {user.role === 'buyer' ? (
                  <>
                    <NavDropdown.Item as={Link} to="/buyer/profile">
                      <FaUser className="me-2 text-success" /> My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/buyer/orders">
                      <FaBox className="me-2 text-success" /> My Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/buyer/wishlist">
                      <FaHeart className="me-2 text-success" /> Wishlist
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/buyer/settings">
                      Settings
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item as={Link} to="/farmer/dashboard">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/farmer/products">
                      My Products
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/farmer/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/farmer/profile">
                      Profile
                    </NavDropdown.Item>
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  <FaSignOutAlt className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="px-3">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="px-3 btn btn-outline-light btn-sm">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;