import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

// @desc    Get all reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    const reviews = await Review.find({ product: productId })
      .populate('user', 'name profileImage')
      .sort('-createdAt');
    
    // Calculate rating distribution
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;
    
    reviews.forEach(review => {
      ratingDistribution[review.rating]++;
      totalRating += review.rating;
    });
    
    res.json({
      success: true,
      reviews,
      ratingDistribution,
      averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @desc    Add a review
// @route   POST /api/reviews
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;
    
    // Validate required fields
    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID is required' 
      });
    }
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ 
        success: false, 
        message: 'Rating must be between 1 and 5' 
      });
    }
    
    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Review comment is required' 
      });
    }
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ 
      product: productId, 
      user: req.user._id 
    });
    
    if (existingReview) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already reviewed this product' 
      });
    }
    
    // Check if user has purchased this product (verified review)
    const hasPurchased = await Order.findOne({
      buyer: req.user._id,
      'items.product': productId,
      orderStatus: 'delivered'
    });
    
    // Create review
    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating: Number(rating),
      title: title || '',
      comment: comment.trim(),
      verified: !!hasPurchased,
    });
    
    // Update product rating
    const allReviews = await Review.find({ product: productId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = totalRating / allReviews.length;
    product.numReviews = allReviews.length;
    await product.save();
    
    // Populate user info
    await review.populate('user', 'name profileImage');
    
    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review,
      productRating: product.rating,
      productNumReviews: product.numReviews
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @desc    Get a single review by ID
// @route   GET /api/reviews/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'name profileImage')
      .populate('product', 'name images');
    
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }
    
    res.json({
      success: true,
      review
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private (only the review owner)
router.put('/:id', protect, async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }
    
    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this review' 
      });
    }
    
    // Update review
    if (rating) review.rating = Number(rating);
    if (title) review.title = title;
    if (comment) review.comment = comment;
    
    await review.save();
    
    // Update product rating
    const product = await Product.findById(review.product);
    const allReviews = await Review.find({ product: review.product });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = totalRating / allReviews.length;
    await product.save();
    
    await review.populate('user', 'name profileImage');
    
    res.json({
      success: true,
      message: 'Review updated successfully',
      review,
      productRating: product.rating
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @desc    Mark review as helpful
// @route   PUT /api/reviews/:id/helpful
// @access  Private
router.put('/:id/helpful', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }
    
    review.helpful += 1;
    await review.save();
    
    res.json({ 
      success: true, 
      message: 'Marked as helpful', 
      helpful: review.helpful 
    });
  } catch (error) {
    console.error('Error marking helpful:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @desc    Delete review (Admin only)
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }
    
    const product = await Product.findById(review.product);
    await review.deleteOne();
    
    // Update product rating
    const allReviews = await Review.find({ product: product._id });
    if (allReviews.length > 0) {
      const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
      product.rating = totalRating / allReviews.length;
    } else {
      product.rating = 0;
    }
    product.numReviews = allReviews.length;
    await product.save();
    
    res.json({ 
      success: true, 
      message: 'Review deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @desc    Get user's reviews
// @route   GET /api/reviews/user/my-reviews
// @access  Private
router.get('/user/my-reviews', protect, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate('product', 'name images price')
      .sort('-createdAt');
    
    res.json({
      success: true,
      reviews,
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @desc    Get product reviews summary (rating distribution only)
// @route   GET /api/reviews/product/:productId/summary
// @access  Public
router.get('/product/:productId/summary', async (req, res) => {
  try {
    const { productId } = req.params;
    
    const reviews = await Review.find({ product: productId });
    
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;
    
    reviews.forEach(review => {
      ratingDistribution[review.rating]++;
      totalRating += review.rating;
    });
    
    res.json({
      success: true,
      ratingDistribution,
      averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('Error fetching review summary:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;