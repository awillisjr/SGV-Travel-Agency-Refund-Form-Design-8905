import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckCircle, FiX, FiMail, FiClock, FiDownload } = FiIcons;

const SuccessModal = ({ isOpen, onClose }) => {
  // Function to download a confirmation receipt
  const handleDownloadReceipt = () => {
    // In a real implementation, this would generate and download a PDF receipt
    // For this demo, we'll just show an alert
    alert('In a production environment, this would download a PDF receipt of your refund request.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <SafeIcon icon={FiCheckCircle} className="h-8 w-8 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Request Submitted Successfully!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Your refund request has been received and is being processed. 
                You'll receive a confirmation email shortly.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiMail} className="text-blue-600" />
                  <span className="font-medium text-blue-800">What's Next?</span>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Confirmation email sent to your inbox</li>
                  <li>• Our team will review your request within 2-3 business days</li>
                  <li>• You'll receive updates via email throughout the process</li>
                </ul>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
                <SafeIcon icon={FiClock} />
                <span>Processing time: Up to 30 business days</span>
              </div>
              
              <button
                onClick={handleDownloadReceipt}
                className="w-full mb-3 bg-white border border-blue-600 text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiDownload} />
                <span>Download Receipt</span>
              </button>
              
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <SafeIcon icon={FiX} className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;