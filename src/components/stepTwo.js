"use client";

export default function StepTwo({ onNext, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white">
      <h1 className="text-4xl font-bold mb-8">Step Two</h1>
      
      {/* Add your step two content here */}
      
      <div className="flex gap-4 mt-8">
        <button 
          onClick={onBack}
          className="px-6 py-3 border border-gray-200 rounded-full"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          className="px-6 py-3 bg-blue-500 text-white rounded-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}
