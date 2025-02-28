// src/hooks/useQuickBase.ts
import { useMemo } from "react";
import { quickbaseService } from "../services/quickbaseConfig";

export const useQuickBase = (options: { logTokens?: boolean } = {}) => {
  const { logTokens = false } = options;
  // Console log the appToken
  if (logTokens) {
    console.log("Service", quickbaseService);
  }

  const quickbase = useMemo(() => {
    const instance = quickbaseService.instance;

    const handler = {
      get(target: any, prop: string) {
        const originalMethod = target[prop];
        if (typeof originalMethod !== "function" || prop === "setTempToken") {
          return originalMethod;
        }

        return async function (...args: any[]) {
          const arg = args[0];
          let dbid: string | undefined;
          if (typeof arg === "object" && arg !== null) {
            dbid = arg.appId || arg.tableId || arg.dbid;
          } else if (typeof arg === "string") {
            dbid = arg;
          }

          if (dbid) {
            await quickbaseService.ensureTempToken(dbid);
            if (logTokens) {
              const tempToken =
                quickbaseService.tempTokens.get(dbid) || "No temp token set";
              const url = prop.includes("App")
                ? `/apps/${dbid}`
                : `/fields?tableId=${dbid}`;
              console.log(`API Request to ${url} with token: ${tempToken}`);
            }
          } else {
            console.warn(
              `No DBID found for method ${prop}, proceeding without token setup`
            );
          }

          return await originalMethod.apply(target, args);
        };
      },
    };

    return new Proxy(instance, handler);
  }, [logTokens]);

  return quickbase;
};
