import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key 
// This should be called once when your app initializes
export const initEmailJS = () => {
  try {
    emailjs.init("pcTrfIp223awqXgje");
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
  }
};

// Test EmailJS configuration
export const testEmailJSConfig = async () => {
  try {
    const testParams = {
      to_email: 'test@example.com',
      from_name: 'Test User',
      message: 'This is a test email'
    };

    const response = await emailjs.send(
      'service_7q3woie',
      'template_rshhs7f',
      testParams
    );
    console.log('EmailJS test successful:', response);
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS test failed:', error);
    return { success: false, error };
  }
};

// Send a refund request email
export const sendRefundRequestEmail = async (formData) => {
  try {
    console.log('Sending refund request email with data:', formData);
    
    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: 'info@stargazevacations.com',
      from_name: formData.fullName,
      from_email: formData.email,
      booking_number: formData.bookingNumber,
      phone_number: formData.phone,
      refund_reason: formData.reason,
      refund_method: getRefundMethodLabel(formData.refundMethod),
      signature_url: formData.signature ? 'Digital signature provided' : 'No signature',
      
      // Add dedicated fields for each payment method (regardless of which is selected)
      // PayPal specific fields
      paypal_name: formData.paypalName || '',
      paypal_email: formData.paypalEmail || '',
      
      // Venmo specific fields
      venmo_name: formData.venmoName || '',
      venmo_handle: formData.venmoHandle || '',
      
      // Check specific fields
      mailing_address: formData.mailingAddress || '',
      city: formData.city || '',
      state: formData.state || '',
      zip_code: formData.zipCode || '',
      
      // Include a formatted full address for checks
      full_mailing_address: formData.refundMethod === 'check' 
        ? `${formData.mailingAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`
        : '',
      
      // Add a flag to indicate which method was selected (useful for conditional content in email templates)
      is_paypal: formData.refundMethod === 'paypal' ? 'true' : 'false',
      is_venmo: formData.refundMethod === 'venmo' ? 'true' : 'false',
      is_check: formData.refundMethod === 'check' ? 'true' : 'false',
      
      // Also keep the consolidated payment_details for backward compatibility
      payment_details: getPaymentDetails(formData)
    };

    console.log('Template parameters:', templateParams);

    // Send email using EmailJS
    const response = await emailjs.send(
      'service_7q3woie',
      'template_rshhs7f',
      templateParams
    );
    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send refund request email:', error);
    // Return detailed error information
    return {
      success: false,
      error: {
        message: error.message || 'Unknown error',
        text: error.text || error.message,
        status: error.status || 'Unknown status'
      }
    };
  }
};

// Helper function to get the refund method label
const getRefundMethodLabel = (method) => {
  const methods = {
    'paypal': 'PayPal',
    'venmo': 'Venmo',
    'check': 'Company Check'
  };
  return methods[method] || method;
};

// Helper function to format payment details based on refund method
const getPaymentDetails = (formData) => {
  switch(formData.refundMethod) {
    case 'paypal':
      return `PayPal Name: ${formData.paypalName}, PayPal Email: ${formData.paypalEmail}`;
    case 'venmo':
      return `Venmo Name: ${formData.venmoName}, Venmo Handle: ${formData.venmoHandle}`;
    case 'check':
      return `Mailing Address: ${formData.mailingAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
    default:
      return '';
  }
};

// Function to send a confirmation email to the customer
export const sendCustomerConfirmationEmail = async (customerData) => {
  try {
    const templateParams = {
      to_name: customerData.fullName,
      to_email: customerData.email,
      booking_number: customerData.bookingNumber,
      refund_method: getRefundMethodLabel(customerData.refundMethod),
      
      // Add dedicated fields for each payment method (regardless of which is selected)
      // PayPal specific fields
      paypal_name: customerData.paypalName || '',
      paypal_email: customerData.paypalEmail || '',
      
      // Venmo specific fields
      venmo_name: customerData.venmoName || '',
      venmo_handle: customerData.venmoHandle || '',
      
      // Check specific fields
      mailing_address: customerData.mailingAddress || '',
      city: customerData.city || '',
      state: customerData.state || '',
      zip_code: customerData.zipCode || '',
      
      // Include a formatted full address for checks
      full_mailing_address: customerData.refundMethod === 'check' 
        ? `${customerData.mailingAddress}, ${customerData.city}, ${customerData.state} ${customerData.zipCode}`
        : '',
      
      // Add flags for conditional email content
      is_paypal: customerData.refundMethod === 'paypal' ? 'true' : 'false',
      is_venmo: customerData.refundMethod === 'venmo' ? 'true' : 'false',
      is_check: customerData.refundMethod === 'check' ? 'true' : 'false',
      
      // Also keep the consolidated payment_details for backward compatibility
      payment_details: getPaymentDetailsForConfirmation(customerData)
    };
    
    const response = await emailjs.send(
      'service_7q3woie',
      'template_y9j7wxj',
      templateParams
    );
    console.log('Customer confirmation email sent:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send customer confirmation email:', error);
    return { success: false, error };
  }
};

// Helper function to format payment details for customer confirmation
const getPaymentDetailsForConfirmation = (customerData) => {
  switch(customerData.refundMethod) {
    case 'paypal':
      return `We'll process your refund to ${customerData.paypalEmail}`;
    case 'venmo':
      return `We'll send your refund to Venmo handle: ${customerData.venmoHandle}`;
    case 'check':
      return `We'll mail your check to: ${customerData.mailingAddress}, ${customerData.city}, ${customerData.state} ${customerData.zipCode}`;
    default:
      return '';
  }
};