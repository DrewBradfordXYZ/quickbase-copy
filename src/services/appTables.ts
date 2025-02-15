import { QuickBaseResponseGetAppTables } from "quickbase";
import { apiRequest } from "./apiRequest";

// Function to list all tables of the app
export const appTables = async (
  appId: string,
  dbid: string
): Promise<QuickBaseResponseGetAppTables> => {
  return apiRequest(dbid, async (quickbase) => {
    const results = await quickbase.getAppTables({ appId });
    return results;
  });
};
