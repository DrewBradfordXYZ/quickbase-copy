// // src/components/MyComponent.tsx
// import React, { useEffect, useState } from "react";
// import { useQuickBase } from "./hooks/useQuickBase";
// import { AxiosRequestConfig } from "axios";

// const MyComponent: React.FC = () => {
//   const { getInstanceForDbid } = useQuickBase();
//   const [appData, setAppData] = useState<any>(null);
//   const [tableData, setTableData] = useState<any>(null);
//   const [tableData2, setTableData2] = useState<any>(null);
//   const appId = import.meta.env.VITE_QUICKBASE_APP_DBID as string;
//   const tableDbid = "buwai2zud";

//   const logAuthTokenTransform = (
//     data: any,
//     headers?: Record<string, string>
//   ): any => {
//     const authHeader = headers?.["Authorization"] || "No token set";
//     const tempToken = authHeader.startsWith("QB-TEMP-TOKEN")
//       ? authHeader.replace("QB-TEMP-TOKEN ", "")
//       : authHeader.startsWith("QB-USER-TOKEN")
//       ? "[User Token]"
//       : authHeader;
//     // Use a more precise URL indicator
//     const url = data ? `/fields?tableId=${tableDbid}` : `/apps/${appId}`;
//     console.log(`API Request to ${url} with token: ${tempToken}`);
//     return data;
//   };

//   const fetchAppData = async () => {
//     try {
//       console.log("Fetching app data...");
//       const qb = await getInstanceForDbid(appId);
//       const requestOptions: AxiosRequestConfig = {
//         transformRequest: [logAuthTokenTransform],
//       };
//       const response = await qb.getApp({ appId, requestOptions });
//       console.log("App data fetched successfully");
//       setAppData(response);
//     } catch (error) {
//       console.error("Error fetching app data:", error);
//     }
//   };

//   const fetchTableData = async () => {
//     try {
//       console.log("Fetching table data (first call)...");
//       const qb = await getInstanceForDbid(tableDbid);
//       const requestOptions: AxiosRequestConfig = {
//         transformRequest: [logAuthTokenTransform],
//       };
//       const response = await qb.getFields({
//         tableId: tableDbid,
//         requestOptions,
//       });
//       console.log("Table data (first call) fetched successfully");
//       setTableData(response);
//     } catch (error) {
//       console.error("Error fetching table data (first call):", error);
//     }
//   };

//   const fetchTableData2 = async () => {
//     try {
//       console.log("Fetching table data (second call)...");
//       const qb = await getInstanceForDbid(tableDbid);
//       const requestOptions: AxiosRequestConfig = {
//         transformRequest: [logAuthTokenTransform],
//       };
//       const response = await qb.getFields({
//         tableId: tableDbid,
//         requestOptions,
//       });
//       console.log("Table data (second call) fetched successfully");
//       setTableData2(response);
//     } catch (error) {
//       console.error("Error fetching table data (second call):", error);
//     }
//   };

//   useEffect(() => {
//     fetchAppData();
//     fetchTableData();
//     fetchTableData2(); // Ensure this runs
//   }, []);

//   return (
//     <div>
//       <div>
//         <h2>App Data</h2>
//         {appData ? (
//           <pre>{JSON.stringify(appData, null, 2)}</pre>
//         ) : (
//           <p>Loading app data...</p>
//         )}
//       </div>
//       <div>
//         <h2>Table Data (First Call)</h2>
//         {tableData ? (
//           <pre>{JSON.stringify(tableData, null, 2)}</pre>
//         ) : (
//           <p>Loading table data (first)...</p>
//         )}
//       </div>
//       <div>
//         <h2>Table Data (Second Call)</h2>
//         {tableData2 ? (
//           <pre>{JSON.stringify(tableData2, null, 2)}</pre>
//         ) : (
//           <p>Loading table data (second)...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyComponent;

// // src/components/MyComponent.tsx
// import React, { useEffect, useState } from "react";
// import { useQuickBase } from "./hooks/useQuickBase";
// import { AxiosRequestConfig } from "axios";

// const MyComponent: React.FC = () => {
//   const { getInstanceForDbid } = useQuickBase();
//   const [appData, setAppData] = useState<any>(null);
//   const [tableData, setTableData] = useState<any>(null);
//   const [tableData2, setTableData2] = useState<any>(null);
//   const appId = import.meta.env.VITE_QUICKBASE_APP_DBID as string;
//   const tableDbid = "buwai2zud";

//   const logAuthTokenTransform = (
//     data: any,
//     headers?: Record<string, string>
//   ): any => {
//     const authHeader = headers?.["Authorization"] || "No token set";
//     const tempToken = authHeader.startsWith("QB-TEMP-TOKEN")
//       ? authHeader.replace("QB-TEMP-TOKEN ", "")
//       : authHeader.startsWith("QB-USER-TOKEN")
//       ? "[User Token]"
//       : authHeader;
//     // Correctly determine the URL based on the request type
//     const url = data ? `/fields?tableId=${tableDbid}` : `/apps/${appId}`;
//     console.log(`API Request to ${url} with token: ${tempToken}`);
//     return data;
//   };

//   const fetchAppData = async () => {
//     try {
//       console.log("Fetching app data...");
//       const qb = await getInstanceForDbid(appId);
//       const requestOptions: AxiosRequestConfig = {
//         transformRequest: [logAuthTokenTransform],
//       };
//       const response = await qb.getApp({ appId, requestOptions });
//       console.log("App data fetched successfully");
//       setAppData(response);
//     } catch (error) {
//       console.error("Error fetching app data:", error);
//     }
//   };

//   const fetchTableData = async () => {
//     try {
//       console.log("Fetching table data (first call)...");
//       const qb = await getInstanceForDbid(tableDbid);
//       const requestOptions: AxiosRequestConfig = {
//         transformRequest: [logAuthTokenTransform],
//       };
//       const response = await qb.getFields({
//         tableId: tableDbid,
//         requestOptions,
//       });
//       console.log("Table data (first call) fetched successfully");
//       setTableData(response);
//     } catch (error) {
//       console.error("Error fetching table data (first call):", error);
//     }
//   };

//   const fetchTableData2 = async () => {
//     try {
//       console.log("Fetching table data (second call)...");
//       const qb = await getInstanceForDbid(tableDbid);
//       const requestOptions: AxiosRequestConfig = {
//         transformRequest: [logAuthTokenTransform],
//       };
//       const response = await qb.getFields({
//         tableId: tableDbid,
//         requestOptions,
//       });
//       console.log("Table data (second call) fetched successfully");
//       setTableData2(response);
//     } catch (error) {
//       console.error("Error fetching table data (second call):", error);
//     }
//   };

//   useEffect(() => {
//     console.log("useEffect triggered");
//     fetchAppData();
//     fetchTableData();
//     fetchTableData2();
//   }, []);

//   return (
//     <div>
//       <div>
//         <h2>App Data</h2>
//         {appData ? (
//           <pre>{JSON.stringify(appData, null, 2)}</pre>
//         ) : (
//           <p>Loading app data...</p>
//         )}
//       </div>
//       <div>
//         <h2>Table Data (First Call)</h2>
//         {tableData ? (
//           <pre>{JSON.stringify(tableData, null, 2)}</pre>
//         ) : (
//           <p>Loading table data (first)...</p>
//         )}
//       </div>
//       <div>
//         <h2>Table Data (Second Call)</h2>
//         {tableData2 ? (
//           <pre>{JSON.stringify(tableData2, null, 2)}</pre>
//         ) : (
//           <p>Loading table data (second)...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyComponent;

// // src/components/MyComponent.tsx
// import React, { useEffect, useState } from "react";
// import { useQuickBase } from "./hooks/useQuickBase";
// import { AxiosRequestConfig } from "axios";

// const MyComponent: React.FC = () => {
//   const { getInstanceForDbid } = useQuickBase();
//   const [appData, setAppData] = useState<any>(null);
//   const [tableData, setTableData] = useState<any>(null);
//   const [tableData2, setTableData2] = useState<any>(null);
//   const appId = import.meta.env.VITE_QUICKBASE_APP_DBID as string;
//   const tableDbid = "buwai2zud";

//   const logAuthTokenTransform = (
//     data: any,
//     headers?: Record<string, string>
//   ): any => {
//     const authHeader = headers?.["Authorization"] || "No token set";
//     const tempToken = authHeader.startsWith("QB-TEMP-TOKEN")
//       ? authHeader.replace("QB-TEMP-TOKEN ", "")
//       : authHeader.startsWith("QB-USER-TOKEN")
//       ? "[User Token]"
//       : authHeader;
//     const url = data ? `/fields?tableId=${tableDbid}` : `/apps/${appId}`;
//     console.log(`API Request to ${url} with token: ${tempToken}`);
//     return data;
//   };

//   const fetchAppData = async () => {
//     try {
//       console.log("Fetching app data...");
//       const qb = await getInstanceForDbid(appId);
//       const requestOptions: AxiosRequestConfig = {
//         transformRequest: [logAuthTokenTransform],
//       };
//       const response = await qb.getApp({ appId, requestOptions });
//       console.log("App data fetched successfully");
//       setAppData(response);
//     } catch (error) {
//       console.error("Error fetching app data:", error);
//     }
//   };

//   const fetchTableData = async () => {
//     try {
//       console.log("Fetching table data (first call)...");
//       const qb = await getInstanceForDbid(tableDbid);
//       const requestOptions: AxiosRequestConfig = {
//         transformRequest: [logAuthTokenTransform],
//       };
//       const response = await qb.getFields({
//         tableId: tableDbid,
//         requestOptions,
//       });
//       console.log("Table data (first call) fetched successfully");
//       setTableData(response);
//     } catch (error) {
//       console.error("Error fetching table data (first call):", error);
//     }
//   };

//   const fetchTableData2 = async () => {
//     try {
//       console.log("Fetching table data (second call)...");
//       const qb = await getInstanceForDbid(tableDbid);
//       const requestOptions: AxiosRequestConfig = {
//         transformRequest: [logAuthTokenTransform],
//       };
//       const response = await qb.getFields({
//         tableId: tableDbid,
//         requestOptions,
//       });
//       console.log("Table data (second call) fetched successfully");
//       setTableData2(response);
//     } catch (error) {
//       console.error("Error fetching table data (second call):", error);
//     }
//   };

//   useEffect(() => {
//     console.log("useEffect triggered");
//     fetchAppData();
//     fetchTableData();
//     fetchTableData2();
//   }, []);

//   return (
//     <div>
//       <div>
//         <h2>App Data</h2>
//         {appData ? (
//           <pre>{JSON.stringify(appData, null, 2)}</pre>
//         ) : (
//           <p>Loading app data...</p>
//         )}
//       </div>
//       <div>
//         <h2>Table Data (First Call)</h2>
//         {tableData ? (
//           <pre>{JSON.stringify(tableData, null, 2)}</pre>
//         ) : (
//           <p>Loading table data (first)...</p>
//         )}
//       </div>
//       <div>
//         <h2>Table Data (Second Call)</h2>
//         {tableData2 ? (
//           <pre>{JSON.stringify(tableData2, null, 2)}</pre>
//         ) : (
//           <p>Loading table data (second)...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyComponent;

// src/components/MyComponent.tsx
import React, { useEffect, useState } from "react";
import { useQuickBase } from "./hooks/useQuickBase";
import { AxiosRequestConfig } from "axios";

const MyComponent: React.FC = () => {
  const { getInstanceForDbid } = useQuickBase();
  const [appData, setAppData] = useState<any>(null);
  const [tableData, setTableData] = useState<any>(null);
  const [tableData2, setTableData2] = useState<any>(null);
  const appId = import.meta.env.VITE_QUICKBASE_APP_DBID as string;
  const tableDbid = "buwai2zud";

  const logAuthTokenTransform = (
    data: any,
    headers?: Record<string, string>
  ): any => {
    const authHeader = headers?.["Authorization"] || "No token set";
    const tempToken = authHeader.startsWith("QB-TEMP-TOKEN")
      ? authHeader.replace("QB-TEMP-TOKEN ", "")
      : authHeader.startsWith("QB-USER-TOKEN")
      ? "[User Token]"
      : authHeader;
    const url = data ? `/fields?tableId=${tableDbid}` : `/apps/${appId}`;
    console.log(`API Request to ${url} with token: ${tempToken}`);
    return data;
  };

  useEffect(() => {
    console.log("useEffect triggered");

    // Fetch all data within one scope to ensure instance reuse
    const fetchAllData = async () => {
      try {
        // Get instances once and reuse them
        const appInstance = await getInstanceForDbid(appId);
        const tableInstance = await getInstanceForDbid(tableDbid);
        const requestOptions: AxiosRequestConfig = {
          transformRequest: [logAuthTokenTransform],
        };

        console.log("Fetching app data...");
        const appResponse = await appInstance.getApp({ appId, requestOptions });
        console.log("App data fetched successfully");
        setAppData(appResponse);

        console.log("Fetching table data (first call)...");
        const tableResponse1 = await tableInstance.getFields({
          tableId: tableDbid,
          requestOptions,
        });
        console.log("Table data (first call) fetched successfully");
        setTableData(tableResponse1);

        console.log("Fetching table data (second call)...");
        const tableResponse2 = await tableInstance.getFields({
          tableId: tableDbid,
          requestOptions,
        });
        console.log("Table data (second call) fetched successfully");
        setTableData2(tableResponse2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [getInstanceForDbid]);

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
    </div>
  );
};

export default MyComponent;
