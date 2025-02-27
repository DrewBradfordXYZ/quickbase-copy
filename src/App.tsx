import React, { useEffect, useState } from "react";
import { QuickBaseClient } from "quickbase-node-api";

const App: React.FC = (): React.ReactElement => {
  const [appDetails, setAppDetails] = useState<any>(null);

  useEffect(() => {
    const fetchAppDetails = async () => {
      const client = await QuickBaseClient.initialize({
        realm: import.meta.env.VITE_QUICKBASE_REALM,
        dbid: import.meta.env.VITE_QUICKBASE_APP_DBID,
        userToken: import.meta.env.VITE_QUICKBASE_USER_TOKEN,
        mode: import.meta.env.MODE, // or "development" / "production"
      });

      const details = await client.getApp(
        import.meta.env.VITE_QUICKBASE_APP_DBID
      );
      console.log(details);
      setAppDetails(details);
    };

    fetchAppDetails();
  }, []);

  return (
    <>
      {appDetails && <div>App Name: {appDetails.name}</div>}
      {/* <FetchAppData appId={appDbid} /> */}
      {/* <FetchAppTables appId={appDbid} /> */}
      {/* <FetchTableFields tableId={dbid} /> */}
    </>
  );
};

export default App;
