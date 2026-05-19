import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaSyringe, FaShieldAlt, FaMobile } from 'react-icons/fa';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">FarmMedSafe</h1>
          <div className="space-x-4">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        </div>
      </nav>
      
      <main>
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Safe Milk & Meat for Every Indian Family
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track livestock medicines and ensure your produce is safe for consumption
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Get Started
          </Link>
        </section>
        
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <FaPaw className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Each Animal</h3>
              <p className="text-gray-600">Maintain health records for every animal in your farm</p>
            </div>
            <div className="card text-center">
              <FaSyringe className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Medicine Records</h3>
              <p className="text-gray-600">Log every medicine dose with automatic safety checks</p>
            </div>
            <div className="card text-center">
              <FaShieldAlt className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">Get instant alerts if medicine residue exceeds limits</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}