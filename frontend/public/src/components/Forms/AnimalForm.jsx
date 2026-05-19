import React, { useState } from 'react';
import Button from '../Common/Button';
import Alert from '../Common/Alert';

export default function AnimalForm({ initialData = null, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    animalId: initialData?.animalId || '',
    name: initialData?.name || '',
    type: initialData?.type || 'cow',
    breed: initialData?.breed || '',
    gender: initialData?.gender || 'female',
    age: { years: initialData?.age?.years || 0, months: initialData?.age?.months || 0 },
    weight: { value: initialData?.weight?.value || 0, unit: 'kg' },
    identificationMark: initialData?.identificationMark || ''
  });
  
  const [error, setError] = useState('');
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.animalId || !formData.name) {
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
        <label className="block text-gray-700 mb-2 font-medium">Animal ID *</label>
        <input
          type="text"
          name="animalId"
          value={formData.animalId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., COW-001"
          required
        />
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Animal Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Ganga"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="cow">Cow</option>
            <option value="buffalo">Buffalo</option>
            <option value="goat">Goat</option>
            <option value="sheep">Sheep</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Breed</label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Holstein Friesian"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Age (Years)</label>
          <input
            type="number"
            name="age.years"
            value={formData.age.years}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Age (Months)</label>
          <input
            type="number"
            name="age.months"
            value={formData.age.months}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            max="11"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Weight (kg)</label>
        <input
          type="number"
          name="weight.value"
          value={formData.weight.value}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          step="0.1"
        />
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Identification Mark</label>
        <input
          type="text"
          name="identificationMark"
          value={formData.identificationMark}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., White spot on forehead"
        />
      </div>
      
      <Button type="submit" variant="primary" loading={isLoading} className="w-full">
        {initialData ? 'Update Animal' : 'Add Animal'}
      </Button>
    </form>
  );
}