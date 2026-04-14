import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const { category, organic, minPrice, maxPrice, farmer, search, sort } = req.query;
  
  let query = { isApproved: true, isAvailable: true };
  
  if (category && category !== 'All') {
    query.category = category;
  }
  
  if (organic === 'true') {
    query.organic = true;
  }
  
  if (farmer) {
    query.farmer = farmer;
  }
  
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  
  let sortOption = {};
  switch (sort) {
    case 'price-low':
      sortOption = { price: 1 };
      break;
    case 'price-high':
      sortOption = { price: -1 };
      break;
    case 'rating':
      sortOption = { rating: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }
  
  const products = await Product.find(query)
    .populate('farmer', 'name farmName rating profileImage')
    .sort(sortOption);
  
  res.json(products);
});

// @desc    Get single product with reviews
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('farmer', 'name farmName rating profileImage location isVerified farmDetails');
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  // Get reviews for this product
  const reviews = await Review.find({ product: product._id })
    .populate('user', 'name profileImage')
    .sort('-createdAt');
  
  // Calculate rating distribution
  const ratingDistribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };
  
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingDistribution[review.rating]++;
    }
  });
  
  res.json({
    ...product.toObject(),
    reviews,
    ratingDistribution,
    totalReviews: reviews.length
  });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Farmer
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, unit, quantity, organic, harvestDate, images } = req.body;
  
  const product = await Product.create({
    name,
    description,
    price,
    category,
    unit,
    quantity,
    organic: organic || false,
    harvestDate: harvestDate || Date.now(),
    images,
    farmer: req.user._id,
    isApproved: req.user.role === 'admin',
  });
  
  res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Farmer
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update this product');
  }
  
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, runValidators: true }
  );
  
  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Farmer
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this product');
  }
  
  // Delete all reviews for this product
  await Review.deleteMany({ product: product._id });
  
  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

// @desc    Get farmer's products
// @route   GET /api/products/farmer/me
// @access  Private/Farmer
export const getFarmerProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ farmer: req.user._id }).sort('-createdAt');
  res.json(products);
});

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addProductReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  // Check if user already reviewed
  const alreadyReviewed = await Review.findOne({
    product: product._id,
    user: req.user._id,
  });
  
  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this product');
  }
  
  // Check if user has purchased this product (verified review)
  const hasPurchased = await Order.findOne({
    buyer: req.user._id,
    'items.product': product._id,
    orderStatus: 'delivered'
  });
  
  const review = await Review.create({
    product: product._id,
    user: req.user._id,
    rating: Number(rating),
    title: title || '',
    comment,
    verified: !!hasPurchased,
  });
  
  // Update product ratings
  const reviews = await Review.find({ product: product._id });
  const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
  
  product.numReviews = reviews.length;
  product.rating = totalRating / reviews.length;
  await product.save();
  
  // Populate user info for response
  await review.populate('user', 'name profileImage');
  
  res.status(201).json({ 
    message: 'Review added successfully', 
    review,
    productRating: product.rating,
    productNumReviews: product.numReviews
  });
});

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.id })
    .populate('user', 'name profileImage')
    .sort('-createdAt');
  
  res.json(reviews);
});

// @desc    Mark review as helpful
// @route   PUT /api/reviews/:id/helpful
// @access  Private
export const markReviewHelpful = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  
  review.helpful += 1;
  await review.save();
  
  res.json({ message: 'Marked as helpful', helpful: review.helpful });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  
  const product = await Product.findById(review.product);
  await review.deleteOne();
  
  // Update product ratings
  const reviews = await Review.find({ product: product._id });
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
    product.rating = totalRating / reviews.length;
  } else {
    product.rating = 0;
  }
  product.numReviews = reviews.length;
  await product.save();
  
  res.json({ message: 'Review deleted' });
});