// src/components/MyComponent.tsx
import React, { useEffect, useState } from "react";
import { useQuickBase } from "./hooks/useQuickBase";

const MyComponent: React.FC = () => {
  const { getQBInstanceForTable } = useQuickBase();
  const [appData, setAppData] = useState<any>(null);
  const [tableData, setTableData] = useState<any>(null);
  const appId = import.meta.env.VITE_QUICKBASE_APP_DBID as string;
  const tableDbid = "buwai2zud";

  const fetchAppData = async () => {
    try {
      // Use getInstanceWithTempToken for app DBID to ensure temp token in production
      const qb = await getQBInstanceForTable(appId); // Changed from getQBInstance
      const response = await qb.getApp({ appId });
      setAppData(response);
    } catch (error) {
      console.error("Error fetching app data:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
    }
  };

  const fetchTableData = async () => {
    try {
      const qb = await getQBInstanceForTable(tableDbid);
      const response = await qb.getFields({ tableId: tableDbid });
      setTableData(response);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchAppData();
    fetchTableData();
  }, []);

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
        <h2>Table Data</h2>
        {tableData ? (
          <pre>{JSON.stringify(tableData, null, 2)}</pre>
        ) : (
          <p>Loading table data...</p>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
