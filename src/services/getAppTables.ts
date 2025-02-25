import { QuickBaseResponseGetAppTables } from "quickbase";
import { apiRequest } from "./apiRequest";

// Function to list all tables of the app
export const getAppTables = async (
  appId: string
): Promise<QuickBaseResponseGetAppTables> => {
  return apiRequest(appId, async (quickbase) => {
    const results = await quickbase.getAppTables({ appId });
    return results;
  });
};
