import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import AddAnimal from './pages/AddAnimal';
import AddMedicine from './pages/AddMedicine';
import MedicineHistory from './pages/MedicineHistory';
import AdminDashboard from './pages/AdminDashboard';
import AnimalsList from './pages/AnimalsList';
import AnimalDetail from './pages/AnimalDetail';

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Farmer Routes */}
          <Route path="/farmer-dashboard" element={
            <PrivateRoute role="farmer">
              <FarmerDashboard />
            </PrivateRoute>
          } />
          <Route path="/add-animal" element={
            <PrivateRoute role="farmer">
              <AddAnimal />
            </PrivateRoute>
          } />
          <Route path="/add-medicine" element={
            <PrivateRoute role="farmer">
              <AddMedicine />
            </PrivateRoute>
          } />
          <Route path="/medicine-history" element={
            <PrivateRoute role="farmer">
              <MedicineHistory />
            </PrivateRoute>
          } />
          <Route path="/animals" element={
            <PrivateRoute role="farmer">
              <AnimalsList />
            </PrivateRoute>
          } />
          <Route path="/animals/:id" element={
            <PrivateRoute role="farmer">
              <AnimalDetail />
            </PrivateRoute>
          } />
          <Route path="/animals/edit/:id" element={
            <PrivateRoute role="farmer">
              <AddAnimal />
            </PrivateRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          } />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;