import React, { useState } from 'react';
import { verificationAPI } from '../services/api';
import { QrCode } from 'lucide-react';

const QRScanner = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <QrCode className="w-16 h-16 mx-auto mb-4 text-primary-600" />
          <h1 className="text-3xl font-bold mb-4">QR Code Scanner</h1>
          <p className="text-gray-600">Scan to verify activity or view portfolio</p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
