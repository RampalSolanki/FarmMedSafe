import React from 'react';
import { FaBars } from 'react-icons/fa';

export default function MobileNav({ onMenuClick }) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-20 px-4 py-3 flex items-center justify-between">
      <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-gray-100">
        <FaBars className="text-xl text-primary" />
      </button>
      <h1 className="text-xl font-bold text-primary">FarmMedSafe</h1>
      <div className="w-8" />
    </div>
  );
}