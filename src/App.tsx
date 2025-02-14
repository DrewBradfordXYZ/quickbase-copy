import React, { JSX, useEffect, useState } from "react";
import { getAppData, listAppTables } from "./services/quickbaseService";
import { QuickBaseResponseGetAppTables } from "quickbase";

// Define the shape of the error (optional, can be more specific if needed)
type FetchError = string | null;

const App: React.FC = (): JSX.Element => {
  const [appName, setAppName] = useState<string>("");
  const [errorAppName, setErrorAppName] = useState<FetchError>(null);
  const [tables, setTables] = useState<QuickBaseResponseGetAppTables>([]);
  const [errorTables, setErrorTables] = useState<FetchError>(null);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const data = await getAppData("buwai2zpe"); // Replace with your appId
        setAppName(data.name);
      } catch (err) {
        setErrorAppName("Failed to fetch app data");
      }
    };

    fetchAppData();

    const fetchAppTables = async () => {
      try {
        const fetchedTables = await listAppTables("buwai2zpe"); // Replace with your appId
        setTables(fetchedTables);
      } catch (err) {
        setErrorTables("Failed to fetch app tables");
      }
    };

    fetchAppTables();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <h1>QuickBase App</h1>
      {errorAppName ? (
        <p>{errorAppName}</p>
      ) : appName ? (
        <p>App Name: {appName}</p>
      ) : (
        <p>Loading...</p>
      )}
      <h1>QuickBase App Tables</h1>
      {errorTables ? (
        <p>{errorTables}</p>
      ) : tables.length > 0 ? (
        <ul>
          {tables.map((table) => (
            <li key={table.id}>{table.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default App;
