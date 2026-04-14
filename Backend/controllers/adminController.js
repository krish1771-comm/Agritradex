import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;
    
    if (req.body.isVerified !== undefined) {
      user.isVerified = req.body.isVerified;
      if (req.body.isVerified) {
        user.verificationDocs.verifiedBy = req.user._id;
        user.verificationDocs.verifiedAt = Date.now();
      }
    }
    
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const getProductsAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('farmer', 'name farmName');
  res.json(products);
});

export const approveProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (product) {
    product.isApproved = true;
    await product.save();
    res.json({ message: 'Product approved' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalFarmers = await User.countDocuments({ role: 'farmer' });
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const pendingFarmers = await User.countDocuments({ role: 'farmer', isVerified: false });
  const pendingProducts = await Product.countDocuments({ isApproved: false });
  
  const revenue = await Order.aggregate([
    { $match: { paymentStatus: 'completed' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);
  
  res.json({
    totalUsers,
    totalFarmers,
    totalProducts,
    totalOrders,
    pendingFarmers,
    pendingProducts,
    totalRevenue: revenue[0]?.total || 0,
  });
});