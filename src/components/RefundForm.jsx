import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import SignatureField from './SignatureField';
import SuccessModal from './SuccessModal';
import emailjs from '@emailjs/browser';

const { FiUser, FiHash, FiMail, FiPhone, FiMessageSquare, FiCreditCard, FiCheck, FiAlertCircle, FiLoader } = FiIcons;

const RefundForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    bookingNumber: '',
    email: '',
    phone: '',
    reason: '',
    refundMethod: '',
    signature: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const refundMethods = [
    { value: 'paypal', label: 'PayPal', description: 'Fastest processing time (3-5 business days)' },
    { value: 'venmo', label: 'Venmo', description: 'Quick transfer (3-7 business days)' },
    { value: 'check', label: 'Company Check', description: 'Traditional method (10-15 business days)' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSignatureChange = (signature) => {
    setFormData(prev => ({ ...prev, signature }));
    if (errors.signature) {
      setErrors(prev => ({ ...prev, signature: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.bookingNumber.trim()) newErrors.bookingNumber = 'Booking number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.reason.trim()) newErrors.reason = 'Please provide a reason for the refund';
    if (!formData.refundMethod) newErrors.refundMethod = 'Please select a refund method';
    if (!formData.signature) newErrors.signature = 'Digital signature is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        // Prepare template parameters for EmailJS
        const templateParams = {
          to_email: 'support@wanderways.com', // Replace with your actual email
          from_name: formData.fullName,
          from_email: formData.email,
          booking_number: formData.bookingNumber,
          phone_number: formData.phone,
          refund_reason: formData.reason,
          refund_method: formData.refundMethod,
          // Convert signature to a smaller format for email (optional)
          signature_url: formData.signature
        };

        // Send email using EmailJS
        // Replace these parameters with your actual EmailJS service ID, template ID, and public key
        await emailjs.send(
          'service_wanderways', // Replace with your EmailJS service ID
          'template_refund_request', // Replace with your EmailJS template ID
          templateParams,
          'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );

        // Show success message after email is sent
        setShowSuccess(true);
        
        // Reset form (optional)
        // setFormData({
        //   fullName: '',
        //   bookingNumber: '',
        //   email: '',
        //   phone: '',
        //   reason: '',
        //   refundMethod: '',
        //   signature: '',
        //   agreeToTerms: false
        // });
      } catch (error) {
        console.error('Failed to send email:', error);
        setSubmitError('There was a problem submitting your request. Please try again or contact support directly.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Personal Information</h3>
            <p className="text-gray-600 text-sm">Please provide your contact details</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiUser} className="inline mr-2 text-blue-600" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiHash} className="inline mr-2 text-blue-600" />
                Booking Number *
              </label>
              <input
                type="text"
                name="bookingNumber"
                value={formData.bookingNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.bookingNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g.,WW-123456789"
              />
              {errors.bookingNumber && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="mr-1" />
                  {errors.bookingNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiMail} className="inline mr-2 text-blue-600" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiPhone} className="inline mr-2 text-blue-600" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Refund Details Section */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Refund Details</h3>
            <p className="text-gray-600 text-sm">Tell us why you're requesting a refund</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiMessageSquare} className="inline mr-2 text-blue-600" />
              Reason for Refund Request *
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Please explain the reason for your refund request in detail..."
            />
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <SafeIcon icon={FiAlertCircle} className="mr-1" />
                {errors.reason}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <SafeIcon icon={FiCreditCard} className="inline mr-2 text-blue-600" />
              Preferred Refund Method *
            </label>
            <div className="space-y-3">
              {refundMethods.map((method) => (
                <motion.label
                  key={method.value}
                  whileHover={{scale: 1.02}}
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.refundMethod === method.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="refundMethod"
                    value={method.value}
                    checked={formData.refundMethod === method.value}
                    onChange={handleInputChange}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">{method.label}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                </motion.label>
              ))}
            </div>
            {errors.refundMethod && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <SafeIcon icon={FiAlertCircle} className="mr-1" />
                {errors.refundMethod}
              </p>
            )}
          </div>
        </div>

        {/* Digital Signature Section */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Digital Signature</h3>
            <p className="text-gray-600 text-sm">Please sign below to authorize this refund request</p>
          </div>

          <SignatureField 
            onSignatureChange={handleSignatureChange}
            error={errors.signature}
          />
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <SafeIcon icon={FiAlertCircle} className="text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Important Processing Information</h4>
              <p className="text-amber-700 text-sm">
                Please note that refunds may take up to <strong>30 business days</strong> to process. 
                Processing times may vary depending on your selected refund method and banking institution.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="mt-1 text-blue-600 focus:ring-blue-500 rounded"
            />
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <a 
                href="#terms" 
                className="text-blue-600 hover:text-blue-800 underline font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  // In a real app, this would open terms modal or navigate to terms page
                  alert('Terms and Conditions would open here');
                }}
              >
                Terms and Conditions
              </a>{' '}
              and understand that this refund request will be processed according to company policy.
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm flex items-center">
              <SafeIcon icon={FiAlertCircle} className="mr-1" />
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        {/* Submit Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <SafeIcon icon={FiAlertCircle} className="text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-700 text-sm">{submitError}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`w-full ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
          } text-white font-medium py-4 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2`}
        >
          {isSubmitting ? (
            <>
              <SafeIcon icon={FiLoader} className="text-xl animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiCheck} className="text-xl" />
              <span>Submit Refund Request</span>
            </>
          )}
        </motion.button>
      </form>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </>
  );
};

export default RefundForm;