import express from 'express';
import {
  createCategory,
  getCategories,
  getMainCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  updateCategoryProductCount,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/main', getMainCategories);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategoryById);

// Admin routes
router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);
router.put('/:id/update-count', protect, admin, updateCategoryProductCount);

export default router;