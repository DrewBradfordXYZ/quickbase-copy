import { QuickBaseResponseGetAppTables } from "quickbase";
import { quickBaseClient } from "./quickBaseClient";

// Function to list all tables of the app
export const appTables = async (
  appId: string
): Promise<QuickBaseResponseGetAppTables> => {
  try {
    const quickbase = await quickBaseClient();
    const results = await quickbase.getAppTables({ appId });
    return results;
  } catch (err) {
    console.error("Error fetching app tables:", err);
    throw err;
  }
};
