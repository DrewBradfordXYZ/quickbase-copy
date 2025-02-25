import { QuickBaseResponseGetApp } from "quickbase";
import { apiRequest } from "./apiRequest";

// Function to fetch app data
export const getApp = async (
  appId: string
): Promise<QuickBaseResponseGetApp> => {
  return apiRequest(appId, async (quickbase) => {
    const results = await quickbase.getApp({ appId });
    return results;
  });
};
