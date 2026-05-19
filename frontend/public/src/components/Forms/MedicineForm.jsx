import React, { useState, useEffect } from 'react';
import Button from '../Common/Button';
import Alert from '../Common/Alert';

export default function MedicineForm({ animals, medicines, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    animalId: '',
    medicineId: '',
    doseGiven: { value: '', unit: 'mg/kg' },
    route: 'oral',
    reason: ''
  });
  
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (formData.medicineId && medicines.length > 0) {
      const medicine = medicines.find(m => m._id === formData.medicineId);
      setSelectedMedicine(medicine);
    } else {
      setSelectedMedicine(null);
    }
  }, [formData.medicineId, medicines]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'doseValue') {
      setFormData(prev => ({
        ...prev,
        doseGiven: { ...prev.doseGiven, value: parseFloat(value) }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.animalId || !formData.medicineId || !formData.doseGiven.value) {
      setError('Please fill all required fields');
      return;
    }
    setError('');
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} />}
      
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Select Animal *</label>
        <select
          name="animalId"
          value={formData.animalId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select Animal</option>
          {animals.map(animal => (
            <option key={animal._id} value={animal._id}>
              {animal.name} ({animal.animalId}) - {animal.type}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Select Medicine *</label>
        <select
          name="medicineId"
          value={formData.medicineId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select Medicine</option>
          {medicines.map(medicine => (
            <option key={medicine._id} value={medicine._id}>
              {medicine.name} - {medicine.category}
            </option>
          ))}
        </select>
      </div>
      
      {selectedMedicine && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Standard Dose:</strong> {selectedMedicine.standardDose?.min} - {selectedMedicine.standardDose?.max} {selectedMedicine.standardDose?.unit}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Withdrawal Period:</strong> Milk: {selectedMedicine.withdrawalPeriod?.milk} days | Meat: {selectedMedicine.withdrawalPeriod?.meat} days
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Dose Value *</label>
          <input
            type="number"
            name="doseValue"
            value={formData.doseGiven.value}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            step="0.1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Unit</label>
          <input
            value={formData.doseGiven.unit}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
            readOnly
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Route *</label>
        <select
          name="route"
          value={formData.route}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="oral">Oral</option>
          <option value="injection">Injection</option>
          <option value="topical">Topical</option>
          <option value="intravenous">Intravenous</option>
        </select>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Reason for Medication</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          rows="3"
          placeholder="e.g., Fever, Infection, Preventive"
        />
      </div>
      
      <Button type="submit" variant="primary" loading={isLoading} className="w-full">
        Record Medicine
      </Button>
    </form>
  );
}