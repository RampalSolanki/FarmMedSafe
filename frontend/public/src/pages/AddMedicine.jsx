import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAnimals } from '../services/animalService';
import { getMedicineCatalog, addMedicineEntry } from '../services/medicineService';
import Navbar from '../components/Layouts/Navbar';

const commonMedicines = [
  'Amoxicillin',
  'Penicillin',
  'Tetracycline',
  'Ibuprofen',
  'Aspirin',
  'Paracetamol',
  'Ciprofloxacin',
  'Doxycycline',
  'Metronidazole',
  'Prednisone',
  'Dexamethasone',
  'Enrofloxacin',
  'Gentamicin',
  'Ketoprofen',
  'Meloxicam',
  'Oxytetracycline',
  'Sulfamethoxazole',
  'Trimethoprim',
  'Albendazole',
  'Ivermectin'
];

export default function AddMedicine() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedAnimalId = searchParams.get('animal');
  
  const [animals, setAnimals] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    animalId: preselectedAnimalId || '',
    medicineId: '',
    medicineName: '',
    doseGiven: { value: '', unit: 'mg/kg' },
    route: 'oral',
    reason: ''
  });
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const animalsData = await getAnimals();
    const medicinesData = await getMedicineCatalog();
    setAnimals(animalsData);
    setMedicines(medicinesData);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'doseValue') {
      setFormData(prev => ({
        ...prev,
        doseGiven: { ...prev.doseGiven, value: parseFloat(value) }
      }));
    } else if (name === 'medicineName') {
      const selected = medicines.find(
        (medicine) => medicine.name.toLowerCase() === value.trim().toLowerCase()
      );
      setFormData(prev => ({
        ...prev,
        medicineName: value,
        medicineId: selected ? selected._id : ''
      }));

      // Search for medicines as user types
      if (value.trim().length >= 2) {
        const filtered = commonMedicines.filter(med => 
          med.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered.map(name => ({ name, _id: null })));
      } else {
        setSuggestions([]);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectMedicine = (medicine) => {
    setFormData(prev => ({
      ...prev,
      medicineName: medicine.name,
      medicineId: medicine._id || ''
    }));
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await addMedicineEntry(formData);
      setValidation(result.validation);
      setTimeout(() => {
        navigate('/medicine-history');
      }, 2000);
    } catch (error) {
      alert(error.response?.data?.message || 'Error recording medicine');
    } finally {
      setLoading(false);
    }
  };

  const selectedMedicine = medicines.find(med => med._id === formData.medicineId);
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Record Medicine</h1>
        <form onSubmit={handleSubmit} className="card">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Animal *</label>
            <select 
              name="animalId" 
              value={formData.animalId} 
              onChange={handleChange} 
              className="input" 
              required
              disabled={!!preselectedAnimalId}
            >
              <option value="">Select Animal</option>
              {animals.map(animal => (
                <option key={animal._id} value={animal._id}>
                  {animal.name} ({animal.animalId}) - {animal.type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">Medicine *</label>
            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
              className="input"
              placeholder="Type or select medicine"
              required
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto w-full">
                {suggestions.map((medicine, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectMedicine(medicine)}
                  >
                    {medicine.name}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Start typing to see suggestions, or enter a new medicine name if it is not listed.
            </p>
            {selectedMedicine ? (
              <p className="text-sm mt-2 text-gray-600">
                Selected category: {selectedMedicine.category}
              </p>
            ) : (
              formData.medicineName && (
                <p className="text-sm mt-2 text-gray-600">
                  Custom medicine: {formData.medicineName}
                </p>
              )
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Dose Value *</label>
              <input 
                type="number" 
                name="doseValue" 
                value={formData.doseGiven.value} 
                onChange={handleChange} 
                className="input" 
                step="0.1"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Unit</label>
              <input value="mg/kg" className="input bg-gray-100" readOnly />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Route *</label>
            <select name="route" value={formData.route} onChange={handleChange} className="input" required>
              <option value="oral">Oral</option>
              <option value="injection">Injection</option>
              <option value="topical">Topical</option>
              <option value="intravenous">Intravenous</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Reason for medication</label>
            <textarea 
              name="reason" 
              value={formData.reason} 
              onChange={handleChange} 
              className="input" 
              rows="3"
              placeholder="e.g., Fever, Infection, Preventive"
            />
          </div>
          
          {validation && (
            <div className={`mb-4 p-4 rounded ${
              validation.status === 'safe' ? 'bg-green-100 text-green-700' :
              validation.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              <p className="font-semibold">{validation.message}</p>
              {validation.withdrawalEndDate && (
                <p className="text-sm mt-2">
                  ⏰ Milk/Meat safe after: {new Date(validation.withdrawalEndDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
          
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Recording...' : 'Record Medicine'}
          </button>
        </form>
      </div>
    </div>
  );
}