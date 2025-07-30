import React, { useRef, useState, useEffect } from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit3, FiTrash2, FiAlertCircle } = FiIcons;

const SignatureField = ({ onSignatureChange, error }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 150;
    
    // Set drawing properties
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setHasSignature(true);
    onSignatureChange(canvas.toDataURL());
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <SafeIcon icon={FiEdit3} className="inline mr-2 text-blue-600" />
        Digital Signature *
      </label>
      
      <div className={`border rounded-lg overflow-hidden ${error ? 'border-red-500' : 'border-gray-300'}`}>
        <canvas
          ref={canvasRef}
          className="w-full bg-gray-50 cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Please sign above using your mouse or trackpad
          </p>
          
          {hasSignature && (
            <button
              type="button"
              onClick={clearSignature}
              className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-sm font-medium"
            >
              <SafeIcon icon={FiTrash2} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <SafeIcon icon={FiAlertCircle} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default SignatureField;