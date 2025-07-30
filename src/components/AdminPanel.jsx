import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import EmailConfigGuide from './EmailConfigGuide';

const { FiSettings, FiSliders, FiUsers, FiMail } = FiIcons;

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <SafeIcon icon={FiSettings} className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
                <p className="text-sm text-gray-600">Refund Management System</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <SafeIcon icon={FiMail} className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Email Configuration</h3>
              <p className="text-gray-600 text-sm">Set up your EmailJS integration to handle refund requests</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <SafeIcon icon={FiSliders} className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Form Settings</h3>
              <p className="text-gray-600 text-sm">Customize fields and validation rules</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <SafeIcon icon={FiUsers} className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">User Management</h3>
              <p className="text-gray-600 text-sm">Manage admin access and permissions</p>
            </div>
          </div>
        </div>
        
        <EmailConfigGuide />
      </div>
    </div>
  );
};

export default AdminPanel;