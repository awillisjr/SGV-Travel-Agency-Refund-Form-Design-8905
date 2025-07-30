import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initEmailJS } from './services/emailService.js';

// Initialize EmailJS
initEmailJS();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);