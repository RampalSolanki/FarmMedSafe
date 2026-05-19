import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Layouts/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalAnimals: 0,
    totalEntries: 0,
    unsafeEntries: 0
  });
  const [unsafeEntries, setUnsafeEntries] = useState([]);
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const fetchStats = async () => {
    const statsRes = await api.get('/admin/stats');
    const unsafeRes = await api.get('/admin/unsafe-entries');
    setStats(statsRes.data);
    setUnsafeEntries(unsafeRes.data);
  };
  
  const pieData = [
    { name: 'Safe', value: stats.totalEntries - stats.unsafeEntries },
    { name: 'Unsafe', value: stats.unsafeEntries }
  ];
  const COLORS = ['#4CAF50', '#D32F2F'];
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome, {user?.name}</p>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <p className="text-sm opacity-90">Total Farmers</p>
            <p className="text-3xl font-bold">{stats.totalFarmers}</p>
          </div>
          <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
            <p className="text-sm opacity-90">Total Animals</p>
            <p className="text-3xl font-bold">{stats.totalAnimals}</p>
          </div>
          <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <p className="text-sm opacity-90">Medicine Records</p>
            <p className="text-3xl font-bold">{stats.totalEntries}</p>
          </div>
          <div className="card bg-gradient-to-r from-red-500 to-red-600 text-white">
            <p className="text-sm opacity-90">Unsafe Entries</p>
            <p className="text-3xl font-bold">{stats.unsafeEntries}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Safety Overview</h3>
            <PieChart width={400} height={300}>
              <Pie data={pieData} cx={200} cy={150} innerRadius={60} outerRadius={100} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Recent Unsafe Entries</h3>
          {unsafeEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No unsafe entries found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Farmer</th>
                    <th className="px-4 py-3 text-left">Animal</th>
                    <th className="px-4 py-3 text-left">Medicine</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {unsafeEntries.map(entry => (
                    <tr key={entry._id} className="border-t">
                      <td className="px-4 py-3">{entry.user?.name || 'N/A'}</td>
                      <td className="px-4 py-3">{entry.animal?.name || 'N/A'}</td>
                      <td className="px-4 py-3">{entry.medicine?.name || 'N/A'}</td>
                      <td className="px-4 py-3">{new Date(entry.dateGiven).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{entry.validationResult?.message}</td>
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