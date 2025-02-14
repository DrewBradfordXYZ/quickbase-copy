import { QuickBaseResponseGetApp } from "quickbase";
import { quickBaseClient } from "./quickBaseClient";

// Function to fetch app data
export const appData = async (
  appId: string
): Promise<QuickBaseResponseGetApp> => {
  try {
    const quickbase = await quickBaseClient();
    const results = await quickbase.getApp({ appId });
    return results;
  } catch (err) {
    console.error("Error fetching app data:", err);
    throw err;
  }
};
