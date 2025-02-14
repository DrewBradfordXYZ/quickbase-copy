import React, { useEffect, useState } from "react";
import { appData } from "../services/appData";
import { QuickBaseRequestGetApp } from "quickbase";

const FetchAppData: React.FC<QuickBaseRequestGetApp> = ({ appId }) => {
  const [appName, setAppName] = useState<string>("");
  const [errorAppName, setErrorAppName] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const results = await appData(appId);
        setAppName(results.name);
      } catch (err) {
        setErrorAppName("Failed to fetch app data");
      }
    };

    fetchAppData();
  }, [appId]);

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
