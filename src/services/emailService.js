import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// This should be called once when your app initializes
export const initEmailJS = () => {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key
};

// Send a refund request email
export const sendRefundRequestEmail = async (formData) => {
  try {
    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: 'support@wanderways.com', // Change this to your actual email
      from_name: formData.fullName,
      from_email: formData.email,
      booking_number: formData.bookingNumber,
      phone_number: formData.phone,
      refund_reason: formData.reason,
      refund_method: getRefundMethodLabel(formData.refundMethod),
      signature_url: formData.signature
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      'service_wanderways', // Replace with your EmailJS service ID
      'template_refund_request', // Replace with your EmailJS template ID
      templateParams
    );
    
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send refund request email:', error);
    return { success: false, error };
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

// Function to send a confirmation email to the customer
export const sendCustomerConfirmationEmail = async (customerData) => {
  try {
    const templateParams = {
      to_name: customerData.fullName,
      to_email: customerData.email,
      booking_number: customerData.bookingNumber,
      refund_method: getRefundMethodLabel(customerData.refundMethod)
    };

    const response = await emailjs.send(
      'service_wanderways', // Replace with your EmailJS service ID
      'template_customer_confirmation', // Replace with your EmailJS template ID for customer confirmations
      templateParams
    );
    
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send customer confirmation email:', error);
    return { success: false, error };
  }
};