import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiMail, FiStar } = FiIcons;

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753844839349-Primary%20Logo%20Red%20Blue%20Red%20490%20x%20396%20jpeg.jpg" 
                alt="StarGaze Vacations Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">StarGaze Vacations</h2>
                <p className="text-sm text-gray-600">Your Guiding Star for Dream Vacations</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiPhone} className="text-red-600" />
              <div>
                <div>1-844-782-7429</div>
                <div className="text-xs text-gray-500">Local: 1-937-995-1962</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiMail} className="text-blue-600" />
              <span>alfred@stargazevacations.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;