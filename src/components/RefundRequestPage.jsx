import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RefundForm from './RefundForm';
import Header from './Header';
import Footer from './Footer';

const RefundRequestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Refund Request
            </h1>
            <p className="text-blue-100 text-lg">
              We're here to help process your refund request quickly and efficiently
            </p>
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