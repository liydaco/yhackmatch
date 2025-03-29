"use client";

export default function StepThree({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white">
      <h1 className="text-4xl font-bold mb-8">Step Three</h1>
      
      {/* Add your step three content here */}
      
      <button 
        onClick={onBack}
        className="px-6 py-3 border border-gray-200 rounded-full mt-8"
      >
        Back
      </button>
    </div>
  );
}
