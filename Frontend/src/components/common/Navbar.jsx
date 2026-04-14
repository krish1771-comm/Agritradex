import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar as BSNavbar, Nav, Container, Badge, NavDropdown, Button } from 'react-bootstrap';
import { FaTractor, FaShoppingCart, FaUser } from 'react-icons/fa';
import { logout } from '../../redux/slices/authSlice';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setExpanded(false);
  };

  return (
    <BSNavbar bg="success" variant="dark" expand="lg" sticky="top" className="shadow" expanded={expanded}>
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center" onClick={() => setExpanded(false)}>
          <FaTractor className="me-2" />
          <span className="fw-bold">AgriTradeX</span>
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle onClick={() => setExpanded(expanded ? false : true)} />
        
        <BSNavbar.Collapse>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={() => setExpanded(false)}>Products</Nav.Link>
            <Nav.Link as={Link} to="/farmers" onClick={() => setExpanded(false)}>Farmers</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>About</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative me-2" onClick={() => setExpanded(false)}>
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {isAuthenticated && user ? (
              <NavDropdown 
                title={
                  <span>
                    <FaUser className="me-1" /> {user?.name?.split(' ')[0] || 'User'}
                  </span>
                } 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile" onClick={() => setExpanded(false)}>
                  <FaUser className="me-2" /> My Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders" onClick={() => setExpanded(false)}>
                  📦 My Orders
                </NavDropdown.Item>
                
                {user?.role === 'farmer' && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/farmer/dashboard" onClick={() => setExpanded(false)}>
                      🚜 Farmer Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/farmer/add-product" onClick={() => setExpanded(false)}>
                      ➕ Add Product
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/farmer/my-products" onClick={() => setExpanded(false)}>
                      📦 My Products
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/farmer/orders" onClick={() => setExpanded(false)}>
                      📋 Orders
                    </NavDropdown.Item>
                  </>
                )}
                
                {user?.role === 'admin' && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/admin/dashboard" onClick={() => setExpanded(false)}>
                      <strong>👑 Admin Dashboard</strong>
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/users" onClick={() => setExpanded(false)}>
                      👥 Manage Users
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/products" onClick={() => setExpanded(false)}>
                      📦 Manage Products
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/categories" onClick={() => setExpanded(false)}>
                      📁 Manage Categories
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/reports" onClick={() => setExpanded(false)}>
                      📊 Reports
                    </NavDropdown.Item>
                  </>
                )}
                
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  🚪 Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white" onClick={() => setExpanded(false)}>Login</Nav.Link>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="warning" 
                  size="sm"
                  className="ms-2"
                  onClick={() => setExpanded(false)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;