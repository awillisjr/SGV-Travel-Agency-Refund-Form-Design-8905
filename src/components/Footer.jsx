import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiMail, FiMapPin, FiClock } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Support</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="text-blue-400" />
                <span>1-800-WANDER-1</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="text-blue-400" />
                <span>support@wanderways.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="text-blue-400" />
                <span>123 Travel Plaza, Adventure City, AC 12345</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Support Hours</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="text-blue-400" />
                <span>Monday - Friday: 8AM - 8PM EST</span>
              </div>
              <div className="ml-6">Saturday: 9AM - 5PM EST</div>
              <div className="ml-6">Sunday: 10AM - 4PM EST</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2 text-gray-300">
              <a href="#" className="block hover:text-blue-400 transition-colors">Terms & Conditions</a>
              <a href="#" className="block hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-blue-400 transition-colors">Refund Policy</a>
              <a href="#" className="block hover:text-blue-400 transition-colors">FAQ</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 WanderWays Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;