import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSignOutAlt, FaTachometerAlt, FaPlus, FaHistory } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary">FarmMedSafe</Link>
          
          {user && (
            <div className="flex items-center space-x-6">
              {user.role === 'farmer' && (
                <>
                  <Link to="/farmer-dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                    <FaTachometerAlt />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                  <Link to="/add-animal" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                    <FaPlus />
                    <span className="hidden md:inline">Add Animal</span>
                  </Link>
                  <Link to="/add-medicine" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                    <FaPlus />
                    <span className="hidden md:inline">Add Medicine</span>
                  </Link>
                  <Link to="/medicine-history" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                    <FaHistory />
                    <span className="hidden md:inline">History</span>
                  </Link>
                </>
              )}
              {user.role === 'admin' && (
                <Link to="/admin-dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                  <FaTachometerAlt />
                  <span>Admin</span>
                </Link>
              )}
              <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}