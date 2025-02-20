import React, { JSX } from "react";
import FetchAppData from "./components/FetchAppData";
import FetchAppTables from "./components/FetchAppTables";
import FetchTableFields from "./components/FetchTableFields";

const App: React.FC = (): JSX.Element => {
  const appDbid = import.meta.env.VITE_QUICKBASE_APP_DBID;
  const dbid = "buwai2zws";

  return (
    <>
      <FetchAppData appId={appDbid} dbid={appDbid} />
      <FetchAppTables appId={appDbid} dbid={appDbid} />
      <FetchTableFields tableId={dbid} dbid={dbid} />
    </>
  );
};

export default App;
