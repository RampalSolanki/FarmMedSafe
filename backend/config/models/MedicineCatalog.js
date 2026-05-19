import mongoose from 'mongoose';

const medicineCatalogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  genericName: String,
  category: {
    type: String,
    enum: ['antibiotic', 'painkiller', 'vaccine', 'vitamin', 'dewormer', 'other'],
    required: true
  },
  standardDose: {
    min: Number,
    max: Number,
    unit: String,
    perKg: Boolean
  },
  withdrawalPeriod: {
    milk: Number,
    meat: Number,
    unit: { type: String, default: 'days' }
  },
  mrlLimit: {
    value: Number,
    unit: String
  },
  sideEffects: [String],
  contraindications: [String]
});

export default mongoose.model('MedicineCatalog', medicineCatalogSchema);