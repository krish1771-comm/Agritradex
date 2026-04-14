import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';

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
    user.phone = req.body.phone || user.phone;
    user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;
    
    if (req.body.isVerified !== undefined) {
      user.isVerified = req.body.isVerified;
    }
    
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      isActive: updatedUser.isActive,
      isVerified: updatedUser.isVerified,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (user) {
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount === 1) {
        res.status(400);
        throw new Error('Cannot delete the only admin user');
      }
    }
    
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const getUserStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const productStats = await Product.aggregate([
    { $match: { farmer: userId } },
    { $group: {
      _id: null,
      totalProducts: { $sum: 1 },
      totalStock: { $sum: '$quantity' },
      avgPrice: { $avg: '$price' }
    }}
  ]);
  
  const orderStats = await Order.aggregate([
    { $unwind: '$items' },
    { $match: { 'items.farmer': userId } },
    { $group: {
      _id: null,
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: '$items.price' },
      avgOrderValue: { $avg: '$items.price' }
    }}
  ]);
  
  const reviewStats = await Review.aggregate([
    { $match: { user: userId } },
    { $group: {
      _id: null,
      totalReviews: { $sum: 1 },
      avgRating: { $avg: '$rating' }
    }}
  ]);
  
  res.json({
    products: productStats[0] || { totalProducts: 0, totalStock: 0, avgPrice: 0 },
    orders: orderStats[0] || { totalOrders: 0, totalRevenue: 0, avgOrderValue: 0 },
    reviews: reviewStats[0] || { totalReviews: 0, avgRating: 0 }
  });
});

export const getFarmerPublicProfile = asyncHandler(async (req, res) => {
  const farmer = await User.findOne({ 
    _id: req.params.id, 
    role: 'farmer',
    isActive: true 
  }).select('-password -verificationDocs');
  
  if (!farmer) {
    res.status(404);
    throw new Error('Farmer not found');
  }
  
  const products = await Product.find({ 
    farmer: farmer._id, 
    isApproved: true,
    isAvailable: true 
  }).limit(20);
  
  const reviews = await Review.find({ product: { $in: products.map(p => p._id) } })
    .populate('user', 'name')
    .limit(10);
  
  res.json({
    farmer,
    products,
    reviews,
    productCount: products.length,
  });
});

export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  user.isActive = !user.isActive;
  await user.save();
  
  res.json({ 
    message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
    isActive: user.isActive 
  });
});

export const getVerificationRequests = asyncHandler(async (req, res) => {
  const farmers = await User.find({ 
    role: 'farmer', 
    isVerified: false,
    'verificationDocs.aadharNumber': { $ne: '' }
  }).select('-password');
  
  res.json(farmers);
});

export const verifyFarmer = asyncHandler(async (req, res) => {
  const farmer = await User.findById(req.params.id);
  
  if (!farmer) {
    res.status(404);
    throw new Error('Farmer not found');
  }
  
  if (farmer.role !== 'farmer') {
    res.status(400);
    throw new Error('User is not a farmer');
  }
  
  farmer.isVerified = true;
  farmer.verificationDocs.verifiedBy = req.user._id;
  farmer.verificationDocs.verifiedAt = Date.now();
  
  await farmer.save();
  
  res.json({ message: 'Farmer verified successfully', farmer });
});