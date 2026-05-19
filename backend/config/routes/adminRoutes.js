import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getDashboardStats,
  getAllFarmers,
  getUnsafeEntries
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, adminOnly);
router.get('/stats', getDashboardStats);
router.get('/farmers', getAllFarmers);
router.get('/unsafe-entries', getUnsafeEntries);

export default router;