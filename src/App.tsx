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
        const data = await getAppData("buwai2zpe"); // Replace with your appId
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
