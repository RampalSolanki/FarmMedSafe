import React, { useState } from 'react';
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

export default function Alert({ type = 'info', message, dismissible = true, onClose }) {
  const [visible, setVisible] = useState(true);
  
  const types = {
    success: {
      icon: <FaCheckCircle className="text-green-500" />,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800'
    },
    warning: {
      icon: <FaExclamationTriangle className="text-yellow-500" />,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800'
    },
    error: {
      icon: <FaExclamationTriangle className="text-red-500" />,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800'
    },
    info: {
      icon: <FaInfoCircle className="text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800'
    }
  };
  
  const currentType = types[type];
  
  if (!visible) return null;
  
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };
  
  return (
    <div className={`${currentType.bg} ${currentType.border} border rounded-lg p-4 mb-4 relative`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">{currentType.icon}</div>
        <div className={`flex-1 ${currentType.text}`}>
          <p className="text-sm">{message}</p>
        </div>
        {dismissible && (
          <button onClick={handleClose} className="flex-shrink-0 ml-3">
            <FaTimes className={`${currentType.text} hover:opacity-70`} />
          </button>
        )}
      </div>
    </div>
  );
}