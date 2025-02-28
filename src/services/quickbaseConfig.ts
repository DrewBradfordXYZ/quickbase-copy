// src/services/quickbaseConfig.ts
import { QuickBase, QuickBaseOptions } from "quickbase";

if (!(window as any).quickBaseManager) {
  const userToken: string = import.meta.env.VITE_QUICKBASE_USER_TOKEN || "";
  const appToken: string = import.meta.env.VITE_QUICKBASE_APP_TOKEN || "";
  const realm: string = import.meta.env.VITE_QUICKBASE_REALM || "";
  const isProduction = import.meta.env.MODE === "production";
  const tempTokens: Map<string, string> = new Map();

  // console.log("Initializing QuickBase manager");
  // console.log("Mode:", import.meta.env.MODE);
  // console.log("User Token:", userToken ? "Set" : "Not set");
  // console.log("App Token:", appToken ? "Set" : "Not set");
  // console.log("Realm:", realm);

  const options: QuickBaseOptions = {
    realm: realm,
    autoRenewTempTokens: true,
  };

  if (isProduction) {
    options.appToken = appToken;
  } else {
    options.userToken = userToken;
  }

  const instance = new QuickBase(options);

  const ensureTempToken = async (dbid: string) => {
    if (!isProduction) return;
    if (!tempTokens.has(dbid)) {
      const response = await instance.getTempTokenDBID({ dbid });
      // console.log(
      //   `Create initial temp token for ${dbid}:`,
      //   response.temporaryAuthorization
      // );
      tempTokens.set(dbid, response.temporaryAuthorization);
    } else {
      // console.log(`Try using existing temp token for ${dbid}`);
    }
    instance.setTempToken(dbid, tempTokens.get(dbid)!);
  };

  (window as any).quickBaseManager = { instance, ensureTempToken, tempTokens };
}

export const quickbaseService = (window as any).quickBaseManager;
