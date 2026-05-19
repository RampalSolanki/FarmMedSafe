import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MedicineCatalog from '../models/MedicineCatalog.js';

dotenv.config();

const medicines = [
  {
    name: "Oxytetracycline",
    genericName: "Oxytetracycline Hydrochloride",
    category: "antibiotic",
    standardDose: { min: 10, max: 20, unit: "mg/kg", perKg: true },
    withdrawalPeriod: { milk: 5, meat: 14, unit: "days" },
    mrlLimit: { value: 100, unit: "µg/kg" },
    sideEffects: ["Digestive upset", "Photosensitivity"],
    contraindications: ["Pregnant animals", "Young calves"]
  },
  {
    name: "Penicillin G",
    genericName: "Benzylpenicillin",
    category: "antibiotic",
    standardDose: { min: 10000, max: 20000, unit: "IU/kg", perKg: true },
    withdrawalPeriod: { milk: 3, meat: 10, unit: "days" },
    mrlLimit: { value: 50, unit: "µg/kg" },
    sideEffects: ["Allergic reactions"],
    contraindications: ["Animals with known penicillin allergy"]
  },
  {
    name: "Ivermectin",
    genericName: "Ivermectin",
    category: "dewormer",
    standardDose: { min: 0.2, max: 0.4, unit: "mg/kg", perKg: true },
    withdrawalPeriod: { milk: 7, meat: 28, unit: "days" },
    mrlLimit: { value: 10, unit: "µg/kg" },
    sideEffects: ["Neurological signs in some breeds"],
    contraindications: ["Collies and related breeds"]
  },
  {
    name: "Meloxicam",
    genericName: "Meloxicam",
    category: "painkiller",
    standardDose: { min: 0.5, max: 1, unit: "mg/kg", perKg: true },
    withdrawalPeriod: { milk: 5, meat: 15, unit: "days" },
    mrlLimit: { value: 20, unit: "µg/kg" },
    sideEffects: ["GI ulcers", "Kidney issues"],
    contraindications: ["Dehydrated animals", "Kidney disease"]
  }
];

async function seedMedicines() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await MedicineCatalog.deleteMany();
    await MedicineCatalog.insertMany(medicines);
    console.log('✅ Medicines seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding medicines:', error);
    process.exit(1);
  }
}

seedMedicines();