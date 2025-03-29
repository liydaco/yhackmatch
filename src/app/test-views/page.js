"use client";

import { useState } from "react";
import { generateMenu } from "@/utils/openai";

export default function Home() {
  const [dish1, setDish1] = useState("Grilled sea bass with Mediterranean herbs");
  const [dish2, setDish2] = useState("Dark chocolate soufflé with vanilla bean ice cream");
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateMenu = async () => {
    setLoading(true);
    setError(null);
    setMenu(null);

    try {
      const result = await generateMenu(dish1, dish2);
      setMenu(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Menu Generator Test
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              First Dish
            </label>
            <input
              type="text"
              value={dish1}
              onChange={(e) => setDish1(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Second Dish
            </label>
            <input
              type="text"
              value={dish2}
              onChange={(e) => setDish2(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <button
            onClick={handleGenerateMenu}
            disabled={loading || !dish1.trim() || !dish2.trim()}
            className={`w-full px-4 py-2 rounded-lg text-white font-medium ${
              loading || !dish1.trim() || !dish2.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Generating Menu..." : "Generate Menu"}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {menu && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Generated Menu:
            </h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <pre className="whitespace-pre-wrap font-serif text-gray-800 dark:text-gray-200">
                {menu}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
