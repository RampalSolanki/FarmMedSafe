import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Layouts/Navbar';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';

export default function AnimalDetail() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [medicineHistory, setMedicineHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, [id]);
  
  const fetchData = async () => {
    try {
      const [animalRes, historyRes] = await Promise.all([
        api.get(`/animals/${id}`),
        api.get(`/medicines/history?animalId=${id}`)
      ]);
      setAnimal(animalRes.data);
      setMedicineHistory(historyRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
      </div>
    );
  }
  
  if (!animal) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">Animal not found</div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link to="/animals" className="text-primary hover:underline">← Back to Animals</Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Animal Details">
            <div className="space-y-3">
              <p><strong>Name:</strong> {animal.name}</p>
              <p><strong>ID:</strong> {animal.animalId}</p>
              <p><strong>Type:</strong> {animal.type}</p>
              <p><strong>Breed:</strong> {animal.breed || 'N/A'}</p>
              <p><strong>Gender:</strong> {animal.gender}</p>
              <p><strong>Age:</strong> {animal.age?.years} years {animal.age?.months} months</p>
              <p><strong>Weight:</strong> {animal.weight?.value} {animal.weight?.unit}</p>
              <p><strong>Identification Mark:</strong> {animal.identificationMark || 'N/A'}</p>
            </div>
          </Card>
          
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Link to={`/add-medicine?animal=${animal._id}`}>
                <Button variant="primary" className="w-full">Record Medicine</Button>
              </Link>
              <Link to={`/animals/edit/${animal._id}`}>
                <Button variant="secondary" className="w-full">Edit Details</Button>
              </Link>
            </div>
          </Card>
        </div>
        
        <Card title="Medicine History" className="mt-6">
          {medicineHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No medicine records for this animal</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Medicine</th>
                    <th className="px-4 py-2 text-left">Dose</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {medicineHistory.map(entry => (
                    <tr key={entry._id} className="border-t">
                      <td className="px-4 py-2">{entry.medicine?.name}</td>
                      <td className="px-4 py-2">{entry.doseGiven?.value} {entry.doseGiven?.unit}</td>
                      <td className="px-4 py-2">{new Date(entry.dateGiven).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          entry.validationResult?.status === 'safe' ? 'bg-green-100 text-green-700' :
                          entry.validationResult?.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {entry.validationResult?.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}