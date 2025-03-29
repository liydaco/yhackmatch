"use client";

import { useState } from 'react';

export default function StepOne({ onNext }) {
  const [formData, setFormData] = useState({
    name: '',
    linkedin: '',
    favoriteMeal: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputClasses = "w-full px-4 py-3 rounded-full bg-white border-2 border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-rose-100 to-rose-200 p-4 fixed inset-0">
      {/* Logo and Title */}
      <div className="text-center mb-12">
        <h1 className="text-[2rem] font-black text-navy-900">ymatch</h1>
        <h2 className="text-3xl font-bold mt-4">Connecting People with Food</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 relative z-10">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            required
          />
          
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
            className={inputClasses}
            required
          />
          
          <input
            type="text"
            name="favoriteMeal"
            placeholder="Your Favorite Meal"
            value={formData.favoriteMeal}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-gray-200"
        >
          Match Me
        </button>
      </form>

    </div>
  );
}
