"use client";

import { useState } from "react";
import { generateEmbeddings } from "@/utils/openai";

export default function Home() {
  const [inputText, setInputText] = useState("This is a sample text to test OpenAI embeddings.");
  const [embeddings, setEmbeddings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setEmbeddings(null);

    try {
      const result = await generateEmbeddings(inputText);
      setEmbeddings(result);
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
          OpenAI Embeddings Test
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Sample Text:
            </label>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-800 dark:text-gray-200">{inputText}</p>
            </div>
          </div>

          <button
            onClick={handleTest}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Generating..." : "Generate Embeddings"}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {embeddings && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Generated Embeddings:
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-64">
              <div className="font-mono text-sm">
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Dimension: {embeddings.length}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  First 10 values:
                </p>
                {embeddings.slice(0, 10).map((value, index) => (
                  <div key={index} className="text-gray-800 dark:text-gray-200">
                    [{index}]: {value.toFixed(6)}
                  </div>
                ))}
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  ... {embeddings.length - 10} more values
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
