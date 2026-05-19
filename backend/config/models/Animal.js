import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  animalId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['cow', 'buffalo', 'goat', 'sheep', 'other'],
    required: true
  },
  breed: String,
  age: {
    years: Number,
    months: Number
  },
  weight: {
    value: Number,
    unit: { type: String, default: 'kg' }
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  identificationMark: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Animal', animalSchema);