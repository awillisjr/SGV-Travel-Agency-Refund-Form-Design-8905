import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiInfo, FiCheckSquare, FiMail, FiSettings } = FiIcons;

const EmailConfigGuide = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiSettings} className="text-blue-600 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">EmailJS Configuration Guide</h2>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <SafeIcon icon={FiInfo} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
          <p className="text-blue-700 text-sm">
            To enable email functionality for this refund form, you'll need to set up EmailJS. 
            Follow the steps below to complete the configuration.
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-800 mb-2 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">1</span>
            Create an EmailJS Account
          </h3>
          <p className="text-gray-600 ml-8 text-sm">
            Sign up for a free account at <a href="https://www.emailjs.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">emailjs.com</a>
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800 mb-2 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">2</span>
            Create an Email Service
          </h3>
          <p className="text-gray-600 ml-8 text-sm">
            In the EmailJS dashboard, add a new service (Gmail, Outlook, or other email provider).
            Name your service <code className="bg-gray-100 px-1 py-0.5 rounded">service_wanderways</code> or update the code to match your service ID.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800 mb-2 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">3</span>
            Create Email Templates
          </h3>
          <div className="ml-8 space-y-3">
            <div>
              <h4 className="text-gray-700 font-medium mb-1">Refund Request Template</h4>
              <p className="text-gray-600 text-sm">
                Create a template named <code className="bg-gray-100 px-1 py-0.5 rounded">template_refund_request</code> with the following variables:
              </p>
              <ul className="text-sm text-gray-600 mt-1 list-disc pl-5 space-y-1">
                <li>from_name (Client's name)</li>
                <li>from_email (Client's email)</li>
                <li>booking_number</li>
                <li>phone_number</li>
                <li>refund_reason</li>
                <li>refund_method</li>
                <li>signature_url (optional)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-700 font-medium mb-1">Customer Confirmation Template</h4>
              <p className="text-gray-600 text-sm">
                Create a template named <code className="bg-gray-100 px-1 py-0.5 rounded">template_customer_confirmation</code> with:
              </p>
              <ul className="text-sm text-gray-600 mt-1 list-disc pl-5 space-y-1">
                <li>to_name (Client's name)</li>
                <li>to_email (Client's email)</li>
                <li>booking_number</li>
                <li>refund_method</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800 mb-2 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">4</span>
            Update Code with Your API Keys
          </h3>
          <p className="text-gray-600 ml-8 text-sm">
            Replace <code className="bg-gray-100 px-1 py-0.5 rounded">YOUR_PUBLIC_KEY</code> in <code className="bg-gray-100 px-1 py-0.5 rounded">src/services/emailService.js</code> and 
            update the service and template IDs if needed.
          </p>
        </div>
      </div>
      
      <div className="mt-6 bg-green-50 p-4 rounded-lg">
        <div className="flex items-start">
          <SafeIcon icon={FiCheckSquare} className="text-green-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-green-800 mb-1">Testing Your Configuration</h4>
            <p className="text-green-700 text-sm">
              After setup, submit a test refund request to verify emails are being sent correctly. 
              Check both your admin inbox and the customer email confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfigGuide;