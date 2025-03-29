"use client";

import { useState, useEffect } from 'react';

export default function StepTwo() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "waiting for other users",
    "connecting users",
    "making meals"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-rose-100 to-rose-200 p-4 fixed inset-0">
      {/* Logo and Title */}
      <div className="text-center mb-12">
        <h1 className="text-[2rem] font-black text-navy-900">ymatch</h1>
        <h2 className="text-3xl font-bold mt-4">Finding Your Match</h2>
      </div>

      {/* Loading Animation */}
      <div className="relative flex flex-col items-center justify-center space-y-8">
        {/* Animated dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        {/* Fading message */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-lg text-gray-700 animate-fade-in-out">
            {messages[currentMessage]}
          </p>
        </div>
      </div>
    </div>
  );
}
