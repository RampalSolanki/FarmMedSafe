import User from '../models/User.js';
import Animal from '../models/Animal.js';
import MedicineEntry from '../models/MedicineEntry.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const totalAnimals = await Animal.countDocuments();
    const totalEntries = await MedicineEntry.countDocuments();
    const unsafeEntries = await MedicineEntry.countDocuments({ 'validationResult.status': 'unsafe' });
    
    const recentEntries = await MedicineEntry.find()
      .populate('user', 'name email')
      .populate('animal', 'name animalId')
      .populate('medicine', 'name')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      totalFarmers,
      totalAnimals,
      totalEntries,
      unsafeEntries,
      recentEntries
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: 'farmer' }).select('-password');
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUnsafeEntries = async (req, res) => {
  try {
    const entries = await MedicineEntry.find({ 'validationResult.status': 'unsafe' })
      .populate('user', 'name email')
      .populate('animal', 'name animalId')
      .populate('medicine', 'name')
      .sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};