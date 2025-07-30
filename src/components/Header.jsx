import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGlobe, FiPhone, FiMail } = FiIcons;

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <SafeIcon icon={FiGlobe} className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">WanderWays Travel</h2>
              <p className="text-sm text-gray-600">Your Journey, Our Priority</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiPhone} className="text-blue-600" />
              <span>1-800-WANDER-1</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiMail} className="text-blue-600" />
              <span>support@wanderways.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;