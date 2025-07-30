import React, { useState } from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { testEmailJSConfig } from '../services/emailService';

const { FiBug, FiPlay, FiCheckCircle, FiXCircle, FiLoader } = FiIcons;

const EmailDebugPanel = () => {
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const runEmailTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const result = await testEmailJSConfig();
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiBug} className="text-orange-600 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">Email Debug Panel</h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          Use this panel to test your EmailJS configuration and troubleshoot any issues.
        </p>
        
        <button
          onClick={runEmailTest}
          disabled={isTesting}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50"
        >
          {isTesting ? (
            <>
              <SafeIcon icon={FiLoader} className="animate-spin" />
              <span>Testing...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiPlay} />
              <span>Test EmailJS Configuration</span>
            </>
          )}
        </button>
        
        {testResult && (
          <div className={`p-4 rounded-lg ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start space-x-2">
              <SafeIcon 
                icon={testResult.success ? FiCheckCircle : FiXCircle} 
                className={`mt-0.5 ${testResult.success ? 'text-green-600' : 'text-red-600'}`} 
              />
              <div>
                <h4 className={`font-medium ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
                  {testResult.success ? 'Test Successful!' : 'Test Failed'}
                </h4>
                <div className={`text-sm mt-1 ${testResult.success ? 'text-green-700' : 'text-red-700'}`}>
                  {testResult.success ? (
                    <p>EmailJS is configured correctly and can send emails.</p>
                  ) : (
                    <div>
                      <p><strong>Error:</strong> {testResult.error?.message || testResult.error?.text || 'Unknown error'}</p>
                      <div className="mt-2">
                        <p><strong>Common issues:</strong></p>
                        <ul className="list-disc pl-4 mt-1">
                          <li>Invalid Service ID or Template ID</li>
                          <li>Template variables don't match</li>
                          <li>EmailJS service is not active</li>
                          <li>Public key is incorrect</li>
                          <li>Email service provider authentication failed</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Current Configuration:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Service ID:</strong> service_7q3woie</p>
            <p><strong>Template ID:</strong> template_rshhs7f</p>
            <p><strong>Public Key:</strong> pcTrfIp223awqXgje</p>
            <p><strong>Target Email:</strong> info@stargazevacations.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDebugPanel;