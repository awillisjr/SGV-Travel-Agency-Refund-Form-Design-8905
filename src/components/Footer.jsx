import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiMail, FiMapPin, FiClock, FiGlobe, FiShield, FiAward } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753844839349-Primary%20Logo%20Red%20Blue%20Red%20490%20x%20396%20jpeg.jpg" 
                alt="StarGaze Vacations Logo" 
                className="h-8 w-auto"
              />
              <div>
                <h3 className="font-bold text-lg">StarGaze Vacations</h3>
                <p className="text-sm text-gray-300">Your Guiding Star for Dream Vacations</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Expect an Exceptional Vacation with Exceptional Travel Service
            </p>
            
            {/* Business Credentials */}
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiAward} className="text-red-400" />
                <span>Independent Veteran Owned & Operated Travel Agency</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiShield} className="text-blue-400" />
                <span>An Independent Affiliate of A.S.A.P. Cruise Inc</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Support</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="text-red-400" />
                <div>
                  <div>Toll Free: 1-844-782-7429</div>
                  <div className="text-sm">Local: 1-937-995-1962</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="text-blue-400" />
                <span>alfred@stargazevacations.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="text-red-400" />
                <span>Dayton, OH</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiGlobe} className="text-blue-400" />
                <a href="https://stargazevacations.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                  stargazevacations.com
                </a>
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
            
            <div className="mt-6">
              <h4 className="font-bold mb-2">Quick Links</h4>
              <div className="space-y-2 text-gray-300">
                <a href="#" className="block hover:text-red-400 transition-colors">Terms & Conditions</a>
                <a 
                  href="#privacy" 
                  className="block hover:text-red-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // In a real app, this would link to the actual privacy policy
                    alert('StarGaze Vacations LLC Privacy Policy would open here');
                  }}
                >
                  Privacy Policy
                </a>
                <a href="#" className="block hover:text-red-400 transition-colors">Refund Policy</a>
                <a href="#" className="block hover:text-red-400 transition-colors">FAQ</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legal Information Section */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="text-center text-gray-400 text-xs space-y-2">
            <p className="font-medium">© StarGaze Vacations LLC · Dayton, OH · All rights reserved</p>
            
            {/* Registration Information */}
            <div className="grid md:grid-cols-2 gap-2 max-w-4xl mx-auto">
              <div className="space-y-1">
                <p>Florida Seller of Travel Ref. # ST15578</p>
                <p>California Seller of Travel # 2090937-50</p>
              </div>
              <div className="space-y-1">
                <p>Washington UBID # 603189022</p>
                <p>Iowa Registered Agency # 1202</p>
              </div>
            </div>
            
            {/* Brand Taglines */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm font-medium text-gray-300">
                Designing Your Dream Vacation • Explore the World with StarGaze Vacations
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Independent Veteran Owned & Operated Travel Agency
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;