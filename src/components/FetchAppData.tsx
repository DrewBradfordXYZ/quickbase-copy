import React, { useEffect, useState } from "react";
import { appData } from "../services/appData";

interface FetchAppDataProps {
  appId: string;
  dbid: string;
}

const FetchAppData: React.FC<FetchAppDataProps> = ({ appId, dbid }) => {
  const [appName, setAppName] = useState<string>("");
  const [errorAppName, setErrorAppName] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const results = await appData(appId, dbid);
        setAppName(results.name);
      } catch (err) {
        setErrorAppName("Failed to fetch app data");
      }
    };

    fetchAppData();
  }, [appId, dbid]);

  return (
    <div>
      <h1>QuickBase App</h1>
      {errorAppName ? (
        <p>{errorAppName}</p>
      ) : appName ? (
        <p>App Name: {appName}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchAppData;
