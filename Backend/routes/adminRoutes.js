import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProductsAdmin,
  approveProduct,
  getDashboardStats,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, admin, getUsers);
router.get('/users/:id', protect, admin, getUserById);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/products', protect, admin, getProductsAdmin);
router.put('/products/:id/approve', protect, admin, approveProduct);
router.get('/stats', protect, admin, getDashboardStats);

export default router;