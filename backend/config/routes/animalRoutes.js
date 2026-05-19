import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal
} from '../controllers/animalController.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getAnimals).post(addAnimal);
router.route('/:id').get(getAnimalById).put(updateAnimal).delete(deleteAnimal);

export default router;