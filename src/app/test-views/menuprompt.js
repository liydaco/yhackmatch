"use client";

import { useState, useEffect } from "react";
import { generateMenu } from "@/utils/openai";

export default function MenuPrompt() {
  const [timeLeft, setTimeLeft] = useState(3585); // 59:45 in seconds
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-white flex flex-col items-center px-4">
      {/* Header */}
      <div className="w-full flex justify-between items-center py-4 px-2">
        <span className="text-gray-400">Inbox</span>
        <span className="text-xl font-bold">Gas</span>
        <span className="text-gray-400">Profile</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 -mt-20">
        <h1 className="text-4xl font-black">Play Again</h1>
        
        {/* Lock Icon */}
        <div className="w-16 h-16 flex items-center justify-center">
          <svg 
            viewBox="0 0 24 24" 
            className="w-full h-full text-yellow-500 fill-current"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
          </svg>
        </div>

        {/* Timer */}
        <div className="text-xl font-medium">
          New Polls in {formatTime(timeLeft)}
        </div>

        {/* Divider */}
        <div className="flex items-center w-full max-w-xs">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Skip text */}
        <div className="text-gray-400 flex items-center">
          Skip the wait
          <svg className="w-4 h-4 ml-1 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        {/* Invite Button */}
        <button 
          className="w-full max-w-xs bg-white border-2 border-gray-200 rounded-full py-3 px-6 flex items-center justify-center space-x-2 mt-4"
        >
          <div className="w-6 h-6 bg-green-400 rounded-md"></div>
          <span className="font-semibold">Invite a friend</span>
        </button>
      </div>

      {/* Bottom Decoration */}
      <div className="w-full h-24 overflow-hidden">
        <div className="w-full h-full relative">
          <div className="absolute bottom-0 left-0 right-0 h-12">
            <div className="absolute bottom-0 w-full h-24 flex">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1/6 h-24 rounded-full transform scale-150 ${
                    i % 2 === 0 ? 'bg-pink-500' : 'bg-blue-400'
                  }`}
                  style={{
                    marginLeft: i === 0 ? '-25%' : '-15%',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 