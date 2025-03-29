"use client";

import { useState, useEffect } from "react";

export default function StepTwo({ name, linkedIn, dish, session }) {
  const [status, setStatus] = useState("Connecting...");
  const [error, setError] = useState(null);
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    let ws;

    const connectWebSocket = () => {
      const params = new URLSearchParams({
        name,
        linkedIn,
        dish,
        session,
      });

      ws = new WebSocket(`ws://${window.location.host}/api/socket?${params}`);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "status":
            setStatus(data.message);
            break;
          case "matched":
            setMatchDetails(data.data);
            setStatus("Match found!");
            break;
          case "error":
            setError(data.message);
            break;
        }
      };

      ws.onclose = () => {
        if (!matchDetails) {
          setStatus("Connection closed. Retrying...");
          // Attempt to reconnect after 3 seconds
          setTimeout(connectWebSocket, 3000);
        }
      };

      ws.onerror = () => {
        setError("Connection error occurred");
      };
    };

    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [name, linkedIn, dish, session]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (matchDetails) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          You've been matched!
        </h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Partner:</span>{" "}
            {matchDetails.partner.name}
          </p>
          <p>
            <span className="font-medium">Their dish:</span>{" "}
            {matchDetails.partner.dish}
          </p>
          <a
            href={matchDetails.partner.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
        <p className="text-blue-800">{status}</p>
      </div>
    </div>
  );
}
