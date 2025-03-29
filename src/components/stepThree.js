"use client";

export default function StepThree() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-rose-100 to-rose-200 p-4 fixed inset-0">
      {/* Logo and Title */}
      <div className="text-center mb-12">
        <h1 className="text-[2rem] font-black text-navy-900">ymatch</h1>
        <h2 className="text-3xl font-bold mt-4">Your Match Results</h2>
      </div>

      {/* Two Column Layout for Names and Meals */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left Column */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4">John Doe</h3>
          <p className="text-gray-700">Favorite Meal: Grilled Salmon</p>
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Jane Smith</h3>
          <p className="text-gray-700">Favorite Meal: Pasta Carbonara</p>
        </div>
      </div>

      {/* Generated Meal Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg p-8 shadow-md mb-8">
        <h3 className="text-2xl font-bold mb-4 text-center">Your Perfect Meal Match</h3>
        <div className="prose max-w-none">
          <div className="text-gray-700">
            <h4 className="text-xl font-semibold mb-3">Mediterranean Fusion Delight</h4>
            <p className="mb-4">
              A harmonious blend of both your favorite dishes: pan-seared salmon 
              with a creamy carbonara-inspired sauce, served over fresh linguine 
              and garnished with fresh herbs and lemon zest.
            </p>
            <p className="italic text-sm">
              Wine Pairing: Chardonnay or light-bodied Pinot Noir
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
