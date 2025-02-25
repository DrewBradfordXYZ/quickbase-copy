import React from "react";
import FetchAppData from "./components/FetchAppData";
import FetchAppTables from "./components/FetchAppTables";
import FetchTableFields from "./components/FetchTableFields";

const App: React.FC = (): React.ReactElement => {
  const appDbid: string = import.meta.env.VITE_QUICKBASE_APP_DBID;
  const dbid = "buwai2zws";

  return (
    <>
      <FetchAppData appId={appDbid} />
      <FetchAppTables appId={appDbid} />
      <FetchTableFields tableId={dbid} />
    </>
  );
};

export default App;
