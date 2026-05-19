import mongoose from 'mongoose';

const medicineEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: true
  },
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicineCatalog',
    required: true
  },
  doseGiven: {
    value: Number,
    unit: String
  },
  route: {
    type: String,
    enum: ['oral', 'injection', 'topical', 'intravenous'],
    required: true
  },
  dateGiven: {
    type: Date,
    default: Date.now
  },
  reason: String,
  administeredBy: {
    type: String,
    enum: ['farmer', 'veterinarian'],
    default: 'farmer'
  },
  validationResult: {
    status: {
      type: String,
      enum: ['safe', 'warning', 'unsafe'],
      required: true
    },
    message: String,
    withdrawalEndDate: Date,
    mrlStatus: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('MedicineEntry', medicineEntrySchema);