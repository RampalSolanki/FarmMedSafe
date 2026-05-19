import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addMedicineEntry,
  getMedicineHistory,
  getMedicineCatalog,
  searchMedicines
} from '../controllers/medicineController.js';

const router = express.Router();

// Public routes
router.get('/catalog', getMedicineCatalog);
router.get('/search', searchMedicines);

// Protected routes
router.use(protect);
router.post('/entry', addMedicineEntry);
router.get('/history', getMedicineHistory);

export default router;