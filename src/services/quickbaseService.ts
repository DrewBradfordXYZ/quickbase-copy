import { QuickBase } from "quickbase";

interface AppData {
  name: string;
  id: string;
  [key: string]: any;
}

// Function to generate a new temp token using dbid
const generateTempToken = async (): Promise<string> => {
  const quickbase = new QuickBase({
    realm: import.meta.env.VITE_QUICKBASE_REALM,
  });
  try {
    const response = await quickbase.getTempTokenDBID({
      dbid: import.meta.env.VITE_QUICKBASE_APP_DBID,
    });
    const token = response.temporaryAuthorization;
    if (import.meta.env.MODE !== "development") {
      const expiryTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes from now
      sessionStorage.setItem("quickbase_temp_token", token);
      sessionStorage.setItem(
        "quickbase_temp_token_expiry",
        expiryTime.toString()
      );
    }
    return token;
  } catch (error) {
    console.error("Failed to generate temp token:", error);
    throw new Error(
      "Failed to generate temp token. Please check your environment variables and QuickBase configuration."
    );
  }
};

// Function to initialize QuickBase client
const createQuickBaseClient = async (
  tempToken: string | null = null
): Promise<QuickBase> => {
  let token = tempToken;

  if (!token && import.meta.env.MODE !== "development") {
    // Check if the token is stored in sessionStorage
    token = sessionStorage.getItem("quickbase_temp_token");
    const tokenExpiry = sessionStorage.getItem("quickbase_temp_token_expiry");

    // Check if the token is expired
    if (
      !token ||
      !tokenExpiry ||
      new Date().getTime() >= parseInt(tokenExpiry)
    ) {
      token = await generateTempToken();
    }
  } else if (!token) {
    // Use userToken for development
    token = import.meta.env.VITE_QUICKBASE_USER_TOKEN;
  }

  if (!token) {
    throw new Error(
      "Token is not available. Please check your environment variables."
    );
  }

  return new QuickBase({
    realm: import.meta.env.VITE_QUICKBASE_REALM,
    userToken: import.meta.env.MODE === "development" ? token : undefined,
    tempToken: import.meta.env.MODE !== "development" ? token : undefined,
  });
};

// Function to fetch app data
export const getAppData = async (
  appId: string,
  tempToken: string | null = null
): Promise<AppData> => {
  try {
    const quickbase = await createQuickBaseClient(tempToken);
    const results = await quickbase.getApp({ appId });
    return results;
  } catch (err) {
    console.error("Error fetching app data:", err);
    throw err;
  }
};
