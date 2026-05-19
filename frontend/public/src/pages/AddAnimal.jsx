import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addAnimal, getAnimals, updateAnimal } from '../services/animalService';
import Navbar from '../components/Layouts/Navbar';

export default function AddAnimal() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL if editing
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    animalId: '',
    name: '',
    type: 'cow',
    breed: '',
    gender: 'female',
    age: { years: 0, months: 0 },
    weight: { value: 0, unit: 'kg' },
    identificationMark: ''
  });
  
  useEffect(() => {
    if (id) {
      fetchAnimalForEdit();
    }
  }, [id]);
  
  const fetchAnimalForEdit = async () => {
    try {
      const animals = await getAnimals();
      const animalToEdit = animals.find(a => a._id === id);
      if (animalToEdit) {
        setFormData({
          animalId: animalToEdit.animalId || '',
          name: animalToEdit.name || '',
          type: animalToEdit.type || 'cow',
          breed: animalToEdit.breed || '',
          gender: animalToEdit.gender || 'female',
          age: animalToEdit.age || { years: 0, months: 0 },
          weight: animalToEdit.weight || { value: 0, unit: 'kg' },
          identificationMark: animalToEdit.identificationMark || ''
        });
      }
    } catch (error) {
      console.error('Error fetching animal:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        // Update existing animal
        await updateAnimal(id, formData);
      } else {
        // Add new animal
        await addAnimal(formData);
      }
      navigate('/animals');
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving animal');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Animal' : 'Add New Animal'}</h1>
        <form onSubmit={handleSubmit} className="card">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Animal ID *</label>
            <input 
              name="animalId" 
              value={formData.animalId} 
              onChange={handleChange} 
              className="input" 
              required 
              disabled={!!id}
            />
            {id && <p className="text-xs text-gray-500 mt-1">Animal ID cannot be changed</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Animal Name *</label>
            <input name="name" value={formData.name} onChange={handleChange} className="input" required />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} className="input" required>
                <option value="cow">Cow</option>
                <option value="buffalo">Buffalo</option>
                <option value="goat">Goat</option>
                <option value="sheep">Sheep</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="input" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Breed</label>
            <input name="breed" value={formData.breed} onChange={handleChange} className="input" />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Age (Years)</label>
              <input 
                type="number" 
                name="age.years" 
                value={formData.age.years} 
                onChange={handleChange} 
                className="input" 
                min="0"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Age (Months)</label>
              <input 
                type="number" 
                name="age.months" 
                value={formData.age.months} 
                onChange={handleChange} 
                className="input" 
                min="0" 
                max="11"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Weight (kg)</label>
            <input 
              type="number" 
              name="weight.value" 
              value={formData.weight.value} 
              onChange={handleChange} 
              className="input" 
              step="0.1"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Identification Mark</label>
            <input 
              name="identificationMark" 
              value={formData.identificationMark} 
              onChange={handleChange} 
              className="input" 
              placeholder="e.g., White spot on forehead"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Saving...' : (id ? 'Update Animal' : 'Add Animal')}
          </button>
        </form>
      </div>
    </div>
  );
}