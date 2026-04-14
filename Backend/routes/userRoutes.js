import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
  getFarmerPublicProfile,
  toggleUserStatus,
  getVerificationRequests,
  verifyFarmer,
} from '../controllers/userController.js';
import { protect, admin, farmer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getUsers);
router.get('/verification-requests', protect, admin, getVerificationRequests);
router.put('/verify-farmer/:id', protect, admin, verifyFarmer);
router.put('/:id/toggle-status', protect, admin, toggleUserStatus);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);
router.get('/stats/me', protect, farmer, getUserStats);
router.get('/farmer/:id', getFarmerPublicProfile);

export default router;