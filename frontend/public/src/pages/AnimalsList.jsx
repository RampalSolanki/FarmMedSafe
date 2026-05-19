import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAnimals, deleteAnimal } from '../services/animalService';
import Navbar from '../components/Layouts/Navbar';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import Alert from '../components/Common/Alert';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

export default function AnimalsList() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchAnimals();
  }, []);
  
  const fetchAnimals = async () => {
    try {
      const data = await getAnimals();
      setAnimals(data);
    } catch (err) {
      setError('Failed to load animals');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      try {
        await deleteAnimal(id);
        fetchAnimals();
      } catch (err) {
        alert('Failed to delete animal');
      }
    }
  };
  
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">Loading...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Animals</h1>
          <Link to="/add-animal" className="btn-primary">+ Add New Animal</Link>
        </div>
        
        {error && <Alert type="error" message={error} />}
        
        {animals.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500 mb-4">No animals added yet</p>
            <Link to="/add-animal" className="btn-primary">Add Your First Animal</Link>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map(animal => (
              <Card key={animal._id} className="hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{animal.name}</h3>
                    <p className="text-gray-500 text-sm">{animal.animalId}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs capitalize">
                    {animal.type}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Breed:</strong> {animal.breed || 'N/A'}</p>
                  <p><strong>Gender:</strong> {animal.gender}</p>
                  <p><strong>Age:</strong> {animal.age?.years}y {animal.age?.months}m</p>
                  <p><strong>Weight:</strong> {animal.weight?.value} {animal.weight?.unit}</p>
                </div>
                
                <div className="flex space-x-2 mt-4 pt-3 border-t">
                  <Link to={`/animals/${animal._id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <FaEye className="inline mr-1" /> View
                    </Button>
                  </Link>
                  <Link to={`/animals/edit/${animal._id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      <FaEdit className="inline mr-1" /> Edit
                    </Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(animal._id)} className="flex-1">
                    <FaTrash className="inline mr-1" /> Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}