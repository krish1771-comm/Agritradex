import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getFarmerOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from '../controllers/orderController.js';
import { protect, farmer, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/farmer/orders', protect, farmer, getFarmerOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, farmer, updateOrderStatus);
router.put('/:id/payment', protect, admin, updatePaymentStatus);

export default router;