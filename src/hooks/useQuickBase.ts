// src/hooks/useQuickBase.ts
import { useMemo } from "react";
import { quickbaseService } from "../services/quickbaseConfig";
import { QuickBase } from "quickbase";

export const useQuickBase = (
  options: { logTokens?: boolean } = {}
): QuickBase => {
  const { logTokens = false } = options;
  const isProduction = import.meta.env.MODE === "production";

  const quickbase = useMemo(() => {
    const instance = quickbaseService.instance;

    const handler: ProxyHandler<QuickBase> = {
      get(target: QuickBase, prop: string) {
        const originalMethod = (target as any)[prop];
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
          } else {
            console.warn(
              `No DBID found for method ${prop}, proceeding without token setup`
            );
          }

          // Use returnAxios: true to get full response
          const callArgs = dbid
            ? [...args.slice(0, -2), { ...args[0], returnAxios: true }]
            : args;
          const response = await originalMethod.apply(target, callArgs);

          // Log tokens and update tempTokens after the call
          if (dbid && response.config && response.config.headers) {
            const finalToken =
              response.config.headers["Authorization"]?.replace(
                "QB-TEMP-TOKEN ",
                ""
              ) || "No token set";
            const initialToken = quickbaseService.tempTokens.get(dbid);
            const url = response.config.url || "Unknown URL";
            const params =
              JSON.stringify(response.config.params) || "{No params}";

            if (logTokens) {
              if (isProduction) {
                console.log(
                  `${url} API request. Params: ${params} Token: ${
                    initialToken || "No initial token"
                  }`
                );
                if (
                  finalToken !== initialToken &&
                  !finalToken.startsWith("QB-USER-TOKEN")
                ) {
                  console.log(`Token renewed for DBID: ${dbid}: ${finalToken}`);
                }
              } else {
                console.log(
                  `${url} API request. Params: ${params} User Token Auth`
                );
              }
            }

            // Update tempTokens only in production for temp token renewal
            if (
              isProduction &&
              finalToken !== initialToken &&
              !finalToken.startsWith("QB-USER-TOKEN")
            ) {
              quickbaseService.tempTokens.set(dbid, finalToken);
            }
          }

          return response.data; // Return data as expected
        };
      },
    };

    return new Proxy(instance, handler);
  }, [logTokens, isProduction]); // Include isProduction in dependencies

  return quickbase;
};
