import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Animal from '../models/Animal.js';
import MedicineCatalog from '../models/MedicineCatalog.js';
import MedicineEntry from '../models/MedicineEntry.js';

dotenv.config();

const demoData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Animal.deleteMany({});
    await MedicineEntry.deleteMany({});
    await MedicineCatalog.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo Farmer',
      email: 'farmer@demo.com',
      password: 'password123', // Will be hashed by pre-save hook
      phone: '9876543210',
      role: 'farmer',
      address: {
        village: 'Sharma Village',
        district: 'Delhi',
        state: 'Delhi',
        pincode: '110001'
      },
      farmName: 'Sharma Farm'
    });
    console.log('✅ Demo user created:', demoUser.email);

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@demo.com',
      password: 'admin123',
      phone: '9999999999',
      role: 'admin',
      address: {
        village: 'Admin Office',
        district: 'Delhi',
        state: 'Delhi',
        pincode: '110002'
      }
    });
    console.log('✅ Admin user created:', adminUser.email);

    // Create medicines
    const medicines = await MedicineCatalog.insertMany([
      {
        name: 'Oxytetracycline',
        genericName: 'Oxytetracycline Hydrochloride',
        category: 'antibiotic',
        standardDose: { min: 10, max: 20, unit: 'mg/kg', perKg: true },
        withdrawalPeriod: { milk: 5, meat: 14, unit: 'days' },
        mrlLimit: { value: 100, unit: 'µg/kg' },
        sideEffects: ['Digestive upset', 'Photosensitivity'],
        contraindications: ['Pregnant animals', 'Young calves']
      },
      {
        name: 'Penicillin G',
        genericName: 'Benzylpenicillin',
        category: 'antibiotic',
        standardDose: { min: 10000, max: 20000, unit: 'IU/kg', perKg: true },
        withdrawalPeriod: { milk: 3, meat: 10, unit: 'days' },
        mrlLimit: { value: 50, unit: 'µg/kg' },
        sideEffects: ['Allergic reactions'],
        contraindications: ['Animals with known penicillin allergy']
      },
      {
        name: 'Ivermectin',
        genericName: 'Ivermectin',
        category: 'dewormer',
        standardDose: { min: 0.2, max: 0.4, unit: 'mg/kg', perKg: true },
        withdrawalPeriod: { milk: 7, meat: 28, unit: 'days' },
        mrlLimit: { value: 10, unit: 'µg/kg' },
        sideEffects: ['Neurological signs in some breeds'],
        contraindications: ['Collies and related breeds']
      }
    ]);
    console.log('✅ Medicines created:', medicines.length);

    // Create animals
    const animals = await Animal.insertMany([
      {
        user: demoUser._id,
        animalId: 'COW001',
        name: 'Radha',
        type: 'cow',
        breed: 'Holstein Friesian',
        age: { years: 3, months: 6 },
        weight: { value: 550, unit: 'kg' },
        gender: 'female',
        identificationMark: 'White spot on forehead'
      },
      {
        user: demoUser._id,
        animalId: 'BUF001',
        name: 'Krishna',
        type: 'buffalo',
        breed: 'Murrah',
        age: { years: 4, months: 2 },
        weight: { value: 600, unit: 'kg' },
        gender: 'male',
        identificationMark: 'Black with white stripe'
      },
      {
        user: demoUser._id,
        animalId: 'GOAT001',
        name: 'Moti',
        type: 'goat',
        breed: 'Jamunapari',
        age: { years: 2, months: 0 },
        weight: { value: 80, unit: 'kg' },
        gender: 'female',
        identificationMark: 'Brown with stripes'
      }
    ]);
    console.log('✅ Animals created:', animals.length);

    // Create medicine entries
    await MedicineEntry.insertMany([
      {
        user: demoUser._id,
        animal: animals[0]._id,
        medicine: medicines[0]._id,
        doseGiven: { value: 250, unit: 'ml' },
        route: 'injection',
        dateGiven: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        reason: 'Bacterial infection',
        administeredBy: 'farmer',
        validationResult: {
          status: 'safe',
          message: 'Dose is within safe limits',
          mrlStatus: 'compliant'
        }
      },
      {
        user: demoUser._id,
        animal: animals[1]._id,
        medicine: medicines[2]._id,
        doseGiven: { value: 120, unit: 'ml' },
        route: 'oral',
        dateGiven: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        reason: 'Deworming',
        administeredBy: 'farmer',
        validationResult: {
          status: 'safe',
          message: 'Safe for use',
          mrlStatus: 'compliant'
        }
      }
    ]);
    console.log('✅ Medicine entries created');

    console.log('\n📋 Demo Data Summary:');
    console.log('------------------------');
    console.log('Demo Farmer Email: farmer@demo.com');
    console.log('Demo Farmer Password: password123');
    console.log('Admin Email: admin@demo.com');
    console.log('Admin Password: admin123');
    console.log('------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding demo data:', error.message);
    process.exit(1);
  }
};

demoData();
