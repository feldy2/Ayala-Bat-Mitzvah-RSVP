import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const isSuccess = type === 'success';
  
  return (
    <div 
      className={`flex items-center space-x-3 p-4 rounded-lg ${
        isSuccess 
          ? 'bg-green-50 border border-green-200 text-green-800' 
          : 'bg-red-50 border border-red-200 text-red-800'
      }`}
      role="alert"
    >
      {isSuccess ? (
        <CheckCircle className="h-5 w-5 flex-shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      )}
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default Alert;
