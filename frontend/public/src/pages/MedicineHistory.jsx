import React, { useState, useEffect } from 'react';
import { getMedicineHistory } from '../services/medicineService';
import Navbar from '../components/Layouts/Navbar';

export default function MedicineHistory() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState({ startDate: '', endDate: '' });
  
  useEffect(() => {
    fetchHistory();
  }, [filter]);
  
  const fetchHistory = async () => {
    const data = await getMedicineHistory(filter);
    setEntries(data);
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'safe': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'unsafe': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Medicine History</h1>
        
        <div className="card mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Start Date</label>
              <input type="date" className="input" onChange={(e) => setFilter({...filter, startDate: e.target.value})} />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">End Date</label>
              <input type="date" className="input" onChange={(e) => setFilter({...filter, endDate: e.target.value})} />
            </div>
          </div>
        </div>
        
        <div className="card">
          {entries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No medicine records found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Animal</th>
                    <th className="px-4 py-3 text-left">Medicine</th>
                    <th className="px-4 py-3 text-left">Dose</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Withdrawal End</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(entry => (
                    <tr key={entry._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{entry.animal?.name || 'N/A'}</td>
                      <td className="px-4 py-3">{entry.medicine?.name || 'N/A'}</td>
                      <td className="px-4 py-3">{entry.doseGiven?.value} {entry.doseGiven?.unit}</td>
                      <td className="px-4 py-3">{new Date(entry.dateGiven).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(entry.validationResult?.status)}`}>
                          {entry.validationResult?.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {entry.validationResult?.withdrawalEndDate ? 
                          new Date(entry.validationResult.withdrawalEndDate).toLocaleDateString() : 
                          'N/A'}
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