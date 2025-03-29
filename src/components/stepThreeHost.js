"use client";

export default function StepThreeHost({ onNext }) {
  // Example data - replace with your actual data
  const topMatches = [
    { 
      rank: 1, 
      host: { name: "`Sidi", specialty: "Mint Choc Smoothies" },
      guest: { name: "Luc", preferences: "Mint Choc Chip Icecream" },
      score: 95 
    },
    { 
      rank: 2, 
      host: { name: "Rosie", specialty: "Caprese Salad" },
      guest: { name: "Sarah", preferences: "Burrata and Tomatoes" },
      score: 91 
    },
    { 
      rank: 3, 
      host: { name: "Moody", specialty: "Tiramisu" },
      guest: { name: "Mike Chen", preferences: "Chocolate Cake" },
      score: 82 
    },
    // ... add more matches as needed
  ];

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#f5e6e6] to-[#f8c4c4] overflow-hidden">
      <div className="flex flex-col items-center justify-start h-full p-4">


        {/* Branding */}
        <h2 className="text-[2rem] font-black text-navy-900">ymatch</h2>

        {/* Main Header */}
        <h1 className="text-3xl font-bold text-[#1a237e] mb-8">Your Top Matches</h1>

        {/* Leaderboard */}
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 mb-8 flex-grow overflow-y-auto">
          {topMatches.map((match, index) => (
            <div 
              key={index}
              className="flex items-center p-4 mb-4 rounded-lg hover:bg-gray-50 transition-all border border-gray-100"
            >
              {/* Rank Circle */}
              <div className="w-12 h-12 bg-[#f87171] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                {match.rank}
              </div>
              
              {/* Host Details */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[#1a237e]">{match.host.name}</h3>
                <p className="text-gray-600">{match.host.specialty}</p>
              </div>

              {/* Match Emoji */}
              <div className="mx-4 text-2xl">
                💝
              </div>

              {/* Guest Details */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[#1a237e]">{match.guest.name}</h3>
                <p className="text-gray-600">{match.guest.preferences}</p>
              </div>
              
              {/* Match Score */}
              <div className="text-right">
                <span className="text-2xl font-bold text-[#f87171]">{match.score}%</span>
                <p className="text-sm text-gray-500">match</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
