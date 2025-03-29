"use client";

import Image from 'next/image';
import qrCode from "@/public/images/qr-code.png";

export default function UserList({ users, onNext }) {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#f5e6e6] to-[#f8c4c4] overflow-hidden">
      {/* QR Code - Positioned in top right */}
      <div className="absolute top-8 right-8 bg-white p-4 rounded-xl shadow-lg">
        <Image
          src={qrCode}
          alt="QR Code"
          width={120}
          height={120}
          className="w-auto h-auto"
          priority
          onError={(e) => {
            console.error('Error loading QR code image');
            e.target.style.display = 'none';
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center h-full p-4">
        {/* Show Top Matches Button - Positioned in top left */}
        <button 
          onClick={onNext}
          className="absolute top-8 left-8 bg-[#f87171] hover:bg-[#ef4444] text-white rounded-full py-4 px-8 text-xl font-semibold transition-all"
        >
          Show Top Matches
        </button>

        {/* Branding */}
        <h2 className="text-[2rem] font-black text-navy-900">ymatch</h2>

        {/* Main Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1a237e]">Connected Users</h1>
        </div>

        {/* Users List */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mb-8">
          <ul className="space-y-3">
            {users?.map((user, index) => (
              <li 
                key={index}
                className="p-3 bg-gray-50 rounded-lg text-[#1a237e] font-medium"
              >
                {user.name}
              </li>
            ))}
          </ul>
          {(!users || users.length === 0) && (
            <p className="text-center text-gray-500">No users connected yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
