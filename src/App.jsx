import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import RefundRequestPage from './components/RefundRequestPage';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<RefundRequestPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;