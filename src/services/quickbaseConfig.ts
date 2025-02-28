// src/services/quickbaseConfig.ts
import { QuickBase, QuickBaseOptions } from "quickbase";

interface QuickBaseManagerOptions {
  logTokens?: boolean;
}

export const initializeQuickBaseManager = (
  options: QuickBaseManagerOptions = {}
) => {
  const { logTokens = false } = options;

  if (!(window as any).quickBaseManager) {
    const userToken: string = import.meta.env.VITE_QUICKBASE_USER_TOKEN || "";
    const appToken: string = import.meta.env.VITE_QUICKBASE_APP_TOKEN || "";
    const realm: string = import.meta.env.VITE_QUICKBASE_REALM || "";
    const isProduction = import.meta.env.MODE === "production";
    const tempTokens: Map<string, string> = new Map();

    if (logTokens) {
      console.log("Initializing QuickBase manager");
      console.log(`Mode: ${import.meta.env.MODE}`);
      console.log(`User Token: ${userToken ? "Set" : "Not set"}`);
      console.log(`App Token: ${appToken ? "Set" : "Not set"}`);
      console.log(`Realm: ${realm}`);
    }

    const qbOptions: QuickBaseOptions = {
      realm: realm,
      autoRenewTempTokens: true,
    };

    if (isProduction) {
      qbOptions.appToken = appToken;
    } else {
      qbOptions.userToken = userToken;
    }

    const instance = new QuickBase(qbOptions);

    const ensureTempToken = async (dbid: string) => {
      if (!isProduction) return;
      if (!tempTokens.has(dbid)) {
        if (logTokens)
          console.log(`Generating initial temp token for DBID: ${dbid}`);
        const response = await instance.getTempTokenDBID({ dbid });
        if (logTokens)
          console.log(
            `Generated temp token for DBID: ${dbid}: ${response.temporaryAuthorization}`
          );
        tempTokens.set(dbid, response.temporaryAuthorization);
      }
      instance.setTempToken(dbid, tempTokens.get(dbid)!);
    };

    (window as any).quickBaseManager = {
      instance,
      ensureTempToken,
      tempTokens,
    };
  }

  return (window as any).quickBaseManager;
};

export const quickbaseService = initializeQuickBaseManager({ logTokens: true });
