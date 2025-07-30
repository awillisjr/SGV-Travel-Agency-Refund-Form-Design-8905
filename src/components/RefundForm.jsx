import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import SignatureField from './SignatureField';
import SuccessModal from './SuccessModal';
import { sendRefundRequestEmail, sendCustomerConfirmationEmail } from '../services/emailService';

const { FiUser, FiHash, FiMail, FiPhone, FiMessageSquare, FiCreditCard, FiCheck, FiAlertCircle, FiLoader, FiStar, FiMapPin, FiDollarSign, FiAtSign } = FiIcons;

const RefundForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    bookingNumber: '',
    email: '',
    phone: '',
    reason: '',
    refundMethod: '',
    // PayPal specific fields
    paypalName: '',
    paypalEmail: '',
    // Venmo specific fields
    venmoName: '',
    venmoHandle: '',
    // Check specific fields
    mailingAddress: '',
    city: '',
    state: '',
    zipCode: '',
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
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSignatureChange = (signature) => {
    setFormData(prev => ({
      ...prev,
      signature
    }));

    if (errors.signature) {
      setErrors(prev => ({
        ...prev,
        signature: ''
      }));
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
    
    // Validate method-specific fields
    if (formData.refundMethod === 'paypal') {
      if (!formData.paypalName.trim()) newErrors.paypalName = 'PayPal name is required';
      if (!formData.paypalEmail.trim()) {
        newErrors.paypalEmail = 'PayPal email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.paypalEmail)) {
        newErrors.paypalEmail = 'Please enter a valid PayPal email address';
      }
    } else if (formData.refundMethod === 'venmo') {
      if (!formData.venmoName.trim()) newErrors.venmoName = 'Venmo name is required';
      if (!formData.venmoHandle.trim()) newErrors.venmoHandle = 'Venmo handle/ID is required';
    } else if (formData.refundMethod === 'check') {
      if (!formData.mailingAddress.trim()) newErrors.mailingAddress = 'Mailing address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    }
    
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
        console.log('Attempting to send refund request email...', formData);
        // Send refund request email using the service
        const result = await sendRefundRequestEmail(formData);

        if (result.success) {
          console.log('Email sent successfully:', result.response);

          // Optionally send customer confirmation email
          try {
            await sendCustomerConfirmationEmail(formData);
            console.log('Customer confirmation email sent');
          } catch (confirmationError) {
            console.warn('Customer confirmation email failed:', confirmationError);
            // Don't fail the whole process if confirmation email fails
          }

          // Show success message
          setShowSuccess(true);

          // Reset form after successful submission
          setFormData({
            fullName: '',
            bookingNumber: '',
            email: '',
            phone: '',
            reason: '',
            refundMethod: '',
            paypalName: '',
            paypalEmail: '',
            venmoName: '',
            venmoHandle: '',
            mailingAddress: '',
            city: '',
            state: '',
            zipCode: '',
            signature: '',
            agreeToTerms: false
          });
        } else {
          console.error('Email service returned error:', result.error);
          setSubmitError(`Failed to send email: ${result.error?.text || result.error?.message || 'Unknown error'}. Please check your EmailJS configuration or try again.`);
        }
      } catch (error) {
        console.error('Failed to send email:', error);
        // More specific error messages
        let errorMessage = 'There was a problem submitting your request.';
        if (error.text) {
          errorMessage += ` Error: ${error.text}`;
        } else if (error.message) {
          errorMessage += ` Error: ${error.message}`;
        }
        errorMessage += ' Please check your internet connection and try again, or contact support directly.';
        setSubmitError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Render conditional fields based on the selected refund method
  const renderRefundMethodFields = () => {
    if (!formData.refundMethod) return null;

    switch (formData.refundMethod) {
      case 'paypal':
        return (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100"
          >
            <h4 className="font-medium text-blue-800 mb-3">PayPal Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiUser} className="inline mr-2 text-blue-600" />
                  PayPal Full Name *
                </label>
                <input
                  type="text"
                  name="paypalName"
                  value={formData.paypalName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.paypalName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Name on PayPal account"
                />
                {errors.paypalName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <SafeIcon icon={FiAlertCircle} className="mr-1" />
                    {errors.paypalName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiMail} className="inline mr-2 text-blue-600" />
                  PayPal Email Address *
                </label>
                <input
                  type="email"
                  name="paypalEmail"
                  value={formData.paypalEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.paypalEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.paypal@example.com"
                />
                {errors.paypalEmail && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <SafeIcon icon={FiAlertCircle} className="mr-1" />
                    {errors.paypalEmail}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-blue-700 mt-3">
              <SafeIcon icon={FiAlertCircle} className="inline mr-1" />
              Make sure the name and email match your PayPal account exactly.
            </p>
          </motion.div>
        );
      case 'venmo':
        return (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100"
          >
            <h4 className="font-medium text-blue-800 mb-3">Venmo Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiUser} className="inline mr-2 text-blue-600" />
                  Venmo Full Name *
                </label>
                <input
                  type="text"
                  name="venmoName"
                  value={formData.venmoName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.venmoName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Name on Venmo account"
                />
                {errors.venmoName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <SafeIcon icon={FiAlertCircle} className="mr-1" />
                    {errors.venmoName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiAtSign} className="inline mr-2 text-blue-600" />
                  Venmo Handle/ID *
                </label>
                <input
                  type="text"
                  name="venmoHandle"
                  value={formData.venmoHandle}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.venmoHandle ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="@your-venmo-handle"
                />
                {errors.venmoHandle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <SafeIcon icon={FiAlertCircle} className="mr-1" />
                    {errors.venmoHandle}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-blue-700 mt-3">
              <SafeIcon icon={FiAlertCircle} className="inline mr-1" />
              Please include the @ symbol if it's part of your Venmo handle.
            </p>
          </motion.div>
        );
      case 'check':
        return (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100"
          >
            <h4 className="font-medium text-blue-800 mb-3">Mailing Address for Check</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiMapPin} className="inline mr-2 text-blue-600" />
                  Street Address *
                </label>
                <input
                  type="text"
                  name="mailingAddress"
                  value={formData.mailingAddress}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.mailingAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123 Main St, Apt 456"
                />
                {errors.mailingAddress && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <SafeIcon icon={FiAlertCircle} className="mr-1" />
                    {errors.mailingAddress}
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <SafeIcon icon={FiAlertCircle} className="mr-1" />
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <SafeIcon icon={FiAlertCircle} className="mr-1" />
                      {errors.state}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.zipCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ZIP Code"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <SafeIcon icon={FiAlertCircle} className="mr-1" />
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-blue-700 mt-3">
              <SafeIcon icon={FiAlertCircle} className="inline mr-1" />
              The check will be mailed to this address within 10-15 business days.
            </p>
          </motion.div>
        );
      default:
        return null;
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
                <SafeIcon icon={FiUser} className="inline mr-2 text-red-600" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
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
                <SafeIcon icon={FiHash} className="inline mr-2 text-red-600" />
                Booking Number *
              </label>
              <input
                type="text"
                name="bookingNumber"
                value={formData.bookingNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                  errors.bookingNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., SG-123456789"
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
                <SafeIcon icon={FiMail} className="inline mr-2 text-red-600" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
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
                <SafeIcon icon={FiPhone} className="inline mr-2 text-red-600" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
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
              <SafeIcon icon={FiMessageSquare} className="inline mr-2 text-red-600" />
              Reason for Refund Request *
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none ${
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
              <SafeIcon icon={FiCreditCard} className="inline mr-2 text-red-600" />
              Preferred Refund Method *
            </label>
            <div className="space-y-3">
              {refundMethods.map((method) => (
                <motion.label
                  key={method.value}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.refundMethod === method.value
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="refundMethod"
                    value={method.value}
                    checked={formData.refundMethod === method.value}
                    onChange={handleInputChange}
                    className="mt-1 text-red-600 focus:ring-red-500"
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
            
            {/* Render conditional fields based on selected refund method */}
            {renderRefundMethodFields()}
          </div>
        </div>

        {/* Digital Signature Section */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Digital Signature</h3>
            <p className="text-gray-600 text-sm">Please sign below to authorize this refund request</p>
          </div>
          <SignatureField onSignatureChange={handleSignatureChange} error={errors.signature} />
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <SafeIcon icon={FiAlertCircle} className="text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Important Processing Information</h4>
              <p className="text-amber-700 text-sm">
                Please note that refunds may take up to <strong>30 business days</strong> to process. Processing times may vary depending on your selected refund method and banking institution.
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
              className="mt-1 text-red-600 focus:ring-red-500 rounded"
            />
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <a
                href="#terms"
                className="text-red-600 hover:text-red-800 underline font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  // In a real app, this would open terms modal or navigate to terms page
                  alert('Terms and Conditions would open here');
                }}
              >
                Terms and Conditions
              </a>{' '}
              and understand that this refund request will be processed according to StarGaze Vacations policy.
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
              <div className="text-red-700 text-sm">
                <p className="font-medium mb-1">Submission Failed</p>
                <p>{submitError}</p>
                <div className="mt-2 text-xs">
                  <p><strong>Need help?</strong> Contact our support team:</p>
                  <p>📧 alfred@stargazevacations.com</p>
                  <p>📞 1-844-782-7429</p>
                </div>
              </div>
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
              : 'bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700'
          } text-white font-medium py-4 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2`}
        >
          {isSubmitting ? (
            <>
              <SafeIcon icon={FiLoader} className="text-xl animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiStar} className="text-xl" />
              <span>Submit Refund Request</span>
            </>
          )}
        </motion.button>
      </form>
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
};

export default RefundForm;