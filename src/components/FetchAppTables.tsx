import React, { useEffect, useState } from "react";
import { appTables } from "../services/appTables";
import { QuickBaseResponseGetAppTables } from "quickbase";

interface FetchAppTablesProps {
  appId: string;
  dbid: string;
}

const FetchAppTables: React.FC<FetchAppTablesProps> = ({ appId, dbid }) => {
  const [tables, setTables] = useState<QuickBaseResponseGetAppTables>([]);
  const [errorTables, setErrorTables] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppTables = async () => {
      try {
        const results = await appTables(appId, dbid);
        setTables(results);
      } catch (err) {
        setErrorTables("Failed to fetch app tables");
      }
    };

    fetchAppTables();
  }, [appId, dbid]);

  return (
    <div>
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
    </div>
  );
};

export default FetchAppTables;
