import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
  addProductReview,
  getProductReviews,
} from '../controllers/productController.js';
import { protect, farmer, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:id/reviews', getProductReviews);

// Protected routes
router.post('/', protect, farmer, createProduct);
router.put('/:id', protect, farmer, updateProduct);
router.delete('/:id', protect, farmer, deleteProduct);
router.get('/farmer/me', protect, farmer, getFarmerProducts);
router.post('/:id/reviews', protect, addProductReview);

export default router;