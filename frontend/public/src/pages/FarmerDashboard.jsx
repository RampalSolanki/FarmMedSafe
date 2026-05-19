import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAnimals } from '../services/animalService';
import { getMedicineHistory } from '../services/medicineService';
import { FaPlus, FaHistory, FaPaw, FaSyringe } from 'react-icons/fa';
import Navbar from '../components/Layouts/Navbar';

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [recentEntries, setRecentEntries] = useState([]);
  const [stats, setStats] = useState({ totalAnimals: 0, totalEntries: 0, unsafeAlerts: 0 });
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const animalsData = await getAnimals();
    const historyData = await getMedicineHistory();
    setAnimals(animalsData);
    setRecentEntries(historyData.slice(0, 5));
    
    const unsafeCount = historyData.filter(entry => entry.validationResult?.status === 'unsafe').length;
    setStats({
      totalAnimals: animalsData.length,
      totalEntries: historyData.length,
      unsafeAlerts: unsafeCount
    });
  };
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mb-8">Track your livestock medicines and ensure food safety</p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Total Animals</p>
                <p className="text-3xl font-bold">{stats.totalAnimals}</p>
              </div>
              <FaPaw className="text-4xl opacity-75" />
            </div>
          </div>
          <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Medicine Records</p>
                <p className="text-3xl font-bold">{stats.totalEntries}</p>
              </div>
              <FaSyringe className="text-4xl opacity-75" />
            </div>
          </div>
          <div className="card bg-gradient-to-r from-red-500 to-red-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Safety Alerts</p>
                <p className="text-3xl font-bold">{stats.unsafeAlerts}</p>
              </div>
              <FaHistory className="text-4xl opacity-75" />
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link to="/add-animal" className="card flex items-center justify-between hover:shadow-lg transition">
            <div>
              <h3 className="text-xl font-semibold">Add New Animal</h3>
              <p className="text-gray-600">Register a new animal to your farm</p>
            </div>
            <FaPlus className="text-3xl text-primary" />
          </Link>
          <Link to="/add-medicine" className="card flex items-center justify-between hover:shadow-lg transition">
            <div>
              <h3 className="text-xl font-semibold">Record Medicine</h3>
              <p className="text-gray-600">Log medicine given to an animal</p>
            </div>
            <FaSyringe className="text-3xl text-primary" />
          </Link>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Recent Medicine Records</h3>
            <Link to="/medicine-history" className="text-primary">View All →</Link>
          </div>
          {recentEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No medicine records yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr><th className="px-4 py-2 text-left">Animal</th><th className="px-4 py-2 text-left">Medicine</th><th className="px-4 py-2 text-left">Date</th><th className="px-4 py-2 text-left">Status</th></tr>
                </thead>
                <tbody>
                  {recentEntries.map(entry => (
                    <tr key={entry._id} className="border-t">
                      <td className="px-4 py-2">{entry.animal?.name || 'N/A'}</td>
                      <td className="px-4 py-2">{entry.medicine?.name || 'N/A'}</td>
                      <td className="px-4 py-2">{new Date(entry.dateGiven).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          entry.validationResult?.status === 'safe' ? 'bg-green-100 text-green-700' :
                          entry.validationResult?.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {entry.validationResult?.status || 'Unknown'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}