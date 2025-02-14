import React, { JSX } from "react";
import FetchAppData from "./components/FetchAppData";
import FetchAppTables from "./components/FetchAppTables";

const App: React.FC = (): JSX.Element => {
  const appId = import.meta.env.VITE_QUICKBASE_APP_DBID;

  return (
    <>
      <FetchAppData appId={appId} />
      <FetchAppTables appId={appId} />
    </>
  );
};

export default App;
