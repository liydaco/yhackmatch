"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function StepOne({ onNext }) {
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">Play Again</h1>

      {/* Lock Icon */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center">
          <Image
            src="/lock-icon.svg" // You'll need to add this icon to your public folder
            alt="Lock"
            width={40}
            height={40}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="mb-4">
        <p className="text-lg">New Polls in {formatTime(timeLeft)}</p>
      </div>

      {/* Divider */}
      <div className="flex items-center w-full max-w-xs mb-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Skip Option */}
      <button className="text-gray-500 mb-8">
        Skip the wait
        <span className="inline-block ml-1 transform rotate-45">↪</span>
      </button>

      {/* Invite Friend Button */}
      <button 
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm"
        onClick={onNext}
      >
        <div className="w-6 h-6 bg-green-400 rounded-md"></div>
        <span>Invite a friend</span>
      </button>

      {/* Decorative Bottom Wave */}
      <div className="fixed bottom-0 w-full">
        <div className="h-16 bg-gradient-to-r from-pink-400 via-blue-400 to-pink-400 opacity-50"></div>
      </div>
    </div>
  );
}
