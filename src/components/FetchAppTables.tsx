import React, { useEffect, useState } from "react";
import { getAppTables } from "../services/getAppTables";
import { QuickBaseResponseGetAppTables } from "quickbase";

interface FetchAppTablesProps {
  appId: string;
}

const FetchAppTables: React.FC<FetchAppTablesProps> = ({ appId }) => {
  const [tables, setTables] = useState<QuickBaseResponseGetAppTables>([]);
  const [errorTables, setErrorTables] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppTables = async () => {
      try {
        const results = await getAppTables(appId);
        setTables(results);
      } catch (err) {
        setErrorTables("Failed to fetch app tables");
      }
    };

    fetchAppTables();
  }, [appId]);

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
