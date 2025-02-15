import { QuickBaseResponseGetApp } from "quickbase";
import { apiRequest } from "./apiRequest";

// Function to fetch app data
export const appData = async (
  appId: string,
  dbid: string
): Promise<QuickBaseResponseGetApp> => {
  return apiRequest(dbid, async (quickbase) => {
    const results = await quickbase.getApp({ appId });
    return results;
  });
};
