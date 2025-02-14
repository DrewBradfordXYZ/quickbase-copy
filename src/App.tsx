import React, { JSX, useEffect, useState } from "react";
import { getAppData } from "./services/quickbaseService";

// Define the shape of the error (optional, can be more specific if needed)
type FetchError = string | null;

const App: React.FC = (): JSX.Element => {
  const [appName, setAppName] = useState<string>("");
  const [error, setError] = useState<FetchError>(null);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        // For production, fetch tempToken from server-side API
        let tempToken: string | null = null;
        if (import.meta.env.MODE !== "development") {
          const response = await fetch("http://localhost:3000/get-temp-token");
          if (!response.ok) {
            throw new Error("Failed to fetch tempToken");
          }
          const data = await response.json();
          tempToken = data.tempToken;
        }

        const data = await getAppData("buwai2zpe", tempToken); // Replace with your appId
        setAppName(data.name);
      } catch (err) {
        setError("Failed to fetch app data");
      }
    };

    fetchAppData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <h1>QuickBase App</h1>
      {error ? (
        <p>{error}</p>
      ) : appName ? (
        <p>App Name: {appName}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
