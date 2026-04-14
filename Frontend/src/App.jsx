import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Buyer Components
import Home from './components/buyer/Home';
import Products from './components/buyer/Products';
import ProductDetails from './components/buyer/ProductDetails';
import Cart from './components/buyer/Cart';
import Checkout from './components/buyer/Checkout';
import Login from './components/buyer/Login';
import Register from './components/buyer/Register';
import Farmers from './components/buyer/Farmers';
import PublicFarmerProfile from './components/buyer/PublicFarmerProfile';
import MyOrders from './components/buyer/MyOrders';
import OrderDetails from './components/buyer/OrderDetails';
import Profile from './components/buyer/Profile';

// Common Pages
import About from './components/common/About';
import Contact from './components/common/Contact';
import FAQ from './components/common/FAQ';
import Terms from './components/common/Terms';
import Privacy from './components/common/Privacy';
import NotFound from './components/common/NotFound';

// Farmer Components
import FarmersDashboard from './components/farmer/FarmersDashboard';
import AddProduct from './components/farmer/Addproduct';
import MyProducts from './components/farmer/MyProducts';
import EditProduct from './components/farmer/EditProduct';
import FarmerOrders from './components/farmer/FarmerOrders';
import FarmerProfile from './components/farmer/FarmerProfile';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import ManageProducts from './components/admin/ManageProducts';
import ManageCategories from './components/admin/ManageCategories';
import Reports from './components/admin/Reports';

function App() {
  return (
    <Provider store={store}>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/farmer/:id" element={<PublicFarmerProfile />} />
            
            {/* Common Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Protected Buyer Routes */}
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['buyer', 'farmer', 'admin']}>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute allowedRoles={['buyer', 'farmer', 'admin']}>
                <MyOrders />
              </ProtectedRoute>
            } />
            <Route path="/order/:id" element={
              <ProtectedRoute allowedRoles={['buyer', 'farmer', 'admin']}>
                <OrderDetails />
              </ProtectedRoute>
            } />
            
            {/* Farmer Routes */}
            <Route path="/farmer/dashboard" element={
              <ProtectedRoute allowedRoles={['farmer', 'admin']}>
                <FarmersDashboard />
              </ProtectedRoute>
            } />
            <Route path="/farmer/add-product" element={
              <ProtectedRoute allowedRoles={['farmer', 'admin']}>
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/farmer/my-products" element={
              <ProtectedRoute allowedRoles={['farmer', 'admin']}>
                <MyProducts />
              </ProtectedRoute>
            } />
            <Route path="/farmer/edit-product/:id" element={
              <ProtectedRoute allowedRoles={['farmer', 'admin']}>
                <EditProduct />
              </ProtectedRoute>
            } />
            <Route path="/farmer/orders" element={
              <ProtectedRoute allowedRoles={['farmer', 'admin']}>
                <FarmerOrders />
              </ProtectedRoute>
            } />
            <Route path="/farmer/profile" element={
              <ProtectedRoute allowedRoles={['farmer', 'admin']}>
                <FarmerProfile />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageProducts />
              </ProtectedRoute>
            } />
            <Route path="/admin/categories" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageCategories />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Reports />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;