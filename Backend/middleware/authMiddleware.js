import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = 'agritradex_super_secret_key_2024';

export const protect = async (req, res, next) => {
  let token;

  console.log('🔐 Auth Middleware - Checking authorization');

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('   Token found, verifying...');
      
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('   Token verified for user ID:', decoded.id);
      
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        console.log('   ❌ User not found');
        return res.status(401).json({ message: 'User not found' });
      }
      
      if (!req.user.isActive) {
        console.log('   ❌ Account deactivated');
        return res.status(401).json({ message: 'Account deactivated' });
      }
      
      console.log(`   ✅ User authenticated: ${req.user.email}`);
      next();
    } catch (error) {
      console.error('   ❌ Auth error:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.log('   ❌ No token found');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

export const farmer = (req, res, next) => {
  if (req.user && (req.user.role === 'farmer' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Farmer access required' });
  }
};