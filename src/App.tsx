// src/components/MyComponent.tsx
import React, { useEffect, useState } from "react";
import { useQuickBase } from "./hooks/useQuickBase";

const MyComponent: React.FC = () => {
  const qb = useQuickBase({ logTokens: true }); // Enable token logging
  const [appData, setAppData] = useState<any>(null);
  const [tableData, setTableData] = useState<any>(null);
  const [tableData2, setTableData2] = useState<any>(null);
  const [extraTableData, setExtraTableData] = useState<any>(null);
  const appId = import.meta.env.VITE_QUICKBASE_APP_DBID as string;
  const tableDbid = "buwai2zud";
  const extraTableDbid = "buwai2zud"; // Replace with a valid DBID

  useEffect(() => {
    console.log("Initial useEffect triggered");

    const fetchInitialData = async () => {
      try {
        console.log("Fetching app data...");
        const appResponse = await qb.getApp({ appId });
        console.log("App data fetched successfully");
        setAppData(appResponse);

        console.log("Fetching table data (first call)...");
        const tableResponse1 = await qb.getFields({ tableId: tableDbid });
        console.log("Table data (first call) fetched successfully");
        setTableData(tableResponse1);

        console.log("Fetching table data (second call)...");
        const tableResponse2 = await qb.getFields({ tableId: tableDbid });
        console.log("Table data (second call) fetched successfully");
        setTableData2(tableResponse2);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [qb]);

  const fetchExtraTableData = async () => {
    try {
      console.log("Fetching extra table data...");
      const extraResponse = await qb.getFields({ tableId: extraTableDbid });
      console.log("Extra table data fetched successfully");
      setExtraTableData(extraResponse);
    } catch (error) {
      console.error("Error fetching extra table data:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>App Data</h2>
        {appData ? (
          <pre>{JSON.stringify(appData, null, 2)}</pre>
        ) : (
          <p>Loading app data...</p>
        )}
      </div>
      <div>
        <h2>Table Data (First Call)</h2>
        {tableData ? (
          <pre>{JSON.stringify(tableData, null, 2)}</pre>
        ) : (
          <p>Loading table data (first)...</p>
        )}
      </div>
      <div>
        <h2>Table Data (Second Call)</h2>
        {tableData2 ? (
          <pre>{JSON.stringify(tableData2, null, 2)}</pre>
        ) : (
          <p>Loading table data (second)...</p>
        )}
      </div>
      <div>
        <h2>Extra Table Data</h2>
        {extraTableData ? (
          <pre>{JSON.stringify(extraTableData, null, 2)}</pre>
        ) : (
          <div>
            <p>No extra table data yet</p>
            <button onClick={fetchExtraTableData}>
              Fetch Extra Table Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
