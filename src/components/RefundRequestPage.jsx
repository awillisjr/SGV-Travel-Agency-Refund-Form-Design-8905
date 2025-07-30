import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RefundForm from './RefundForm';
import Header from './Header';
import Footer from './Footer';

const RefundRequestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-red-600 to-blue-600 px-8 py-6">
            <div className="flex items-center space-x-4">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753844839349-Primary%20Logo%20Red%20Blue%20Red%20490%20x%20396%20jpeg.jpg" 
                alt="StarGaze Vacations Logo" 
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Refund Request
                </h1>
                <p className="text-red-100 text-lg">
                  We're here to help process your refund request quickly and efficiently
                </p>
                <p className="text-blue-100 text-sm mt-1">
                  Expect an Exceptional Vacation with Exceptional Travel Service
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <RefundForm />
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RefundRequestPage;