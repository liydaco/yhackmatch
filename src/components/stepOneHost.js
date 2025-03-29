"use client";

import Image from 'next/image';

import qrCode from "@/public/images/qr-code.png";

export default function StepOneHost({ onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#f5e6e6] to-[#f8c4c4] overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full p-4">
 

        {/* Branding */}
        <h2 className="text-[2rem] font-black text-navy-900">ymatch</h2>

        {/* Main Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#1a237e]">What yhangry does best</h1>
          <h1 className="text-4xl font-bold text-[#1a237e]">connecting people with food</h1>
        </div>

        {/* QR Code */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg flex items-center justify-center">
          <Image
            src={qrCode}
            alt="QR Code"
            width={240}
            height={240}
            className="w-auto h-auto"
            priority
            onError={(e) => {
              console.error('Error loading QR code image');
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Get Started Button */}
        <button 
          onClick={handleSubmit}
          className="w-full max-w-md bg-[#f87171] hover:bg-[#ef4444] text-white rounded-full py-4 px-8 text-xl font-semibold transition-all"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
