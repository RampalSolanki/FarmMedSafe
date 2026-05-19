import MedicineEntry from '../models/MedicineEntry.js';
import MedicineCatalog from '../models/MedicineCatalog.js';
import Animal from '../models/Animal.js';
import { checkMRLEntry } from '../utils/mrlChecker.js';

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getMedicineCatalog = async (req, res) => {
  try {
    const medicines = await MedicineCatalog.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMedicineEntry = async (req, res) => {
  try {
    const { animalId, medicineId, medicineName, doseGiven, route, dateGiven, reason } = req.body;

    const animal = await Animal.findOne({ _id: animalId, user: req.user._id });
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    let medicine = null;
    if (medicineId) {
      medicine = await MedicineCatalog.findById(medicineId);
    }

    if (!medicine && medicineName) {
      const trimmedName = medicineName.trim();
      const existingMedicine = await MedicineCatalog.findOne({
        name: { $regex: `^${escapeRegExp(trimmedName)}$`, $options: 'i' }
      });
      if (existingMedicine) {
        medicine = existingMedicine;
      } else {
        medicine = await MedicineCatalog.create({
          name: trimmedName,
          category: 'other',
          standardDose: { min: 0, max: 0, unit: 'mg/kg', perKg: true },
          withdrawalPeriod: { milk: 0, meat: 0, unit: 'days' },
          mrlLimit: { value: 0, unit: '' }
        });
      }
    }

    if (!medicine) {
      return res.status(400).json({ message: 'Medicine ID or name is required' });
    }

    const animalWeight = animal.weight?.value || 300;
    const validationResult = checkMRLEntry(medicine, doseGiven, animalWeight);

    const entry = await MedicineEntry.create({
      user: req.user._id,
      animal: animalId,
      medicine: medicine._id,
      doseGiven,
      route,
      dateGiven: dateGiven || new Date(),
      reason,
      validationResult
    });

    res.status(201).json({
      entry,
      validation: validationResult
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchMedicines = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.json([]);
    }

    const medicines = await MedicineCatalog.find({
      name: { $regex: q.trim(), $options: 'i' }
    }).limit(10);

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedicineHistory = async (req, res) => {
  try {
    const { animalId } = req.query;
    const filter = { user: req.user._id };

    if (animalId) {
      filter.animal = animalId;
    }

    const history = await MedicineEntry.find(filter)
      .populate('animal', 'name tagNumber species breed')
      .populate('medicine', 'name category')
      .sort({ dateGiven: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};