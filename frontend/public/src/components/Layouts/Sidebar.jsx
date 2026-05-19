import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaHistory, FaPaw, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const location = useLocation();
  
  const menuItems = [
    { path: '/farmer-dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/add-animal', icon: <FaPlus />, label: 'Add Animal' },
    { path: '/add-medicine', icon: <FaPlus />, label: 'Add Medicine' },
    { path: '/medicine-history', icon: <FaHistory />, label: 'History' },
    { path: '/animals', icon: <FaPaw />, label: 'My Animals' }
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-xl z-30 w-64 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-primary">FarmMedSafe</h2>
          <p className="text-sm text-gray-500 mt-1">Livestock Management</p>
        </div>
        
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-green-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-red-600 hover:bg-red-50 mt-4"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
}