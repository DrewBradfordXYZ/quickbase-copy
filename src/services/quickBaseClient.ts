import { QuickBase } from "quickbase";

// Function to generate a new temp token using dbid
const generateTempToken = async (dbid: string): Promise<string> => {
  const quickbase = new QuickBase({
    realm: import.meta.env.VITE_QUICKBASE_REALM,
  });
  try {
    const response = await quickbase.getTempTokenDBID({
      dbid: dbid,
    });
    const token = response.temporaryAuthorization;
    console.log("Generated temp token:", token);
    return token;
  } catch (error) {
    console.error("Failed to generate temp token:", error);
    throw new Error(
      "Failed to generate temp token. Please check your environment variables and QuickBase configuration."
    );
  }
};

// Function to initialize QuickBase client
export const quickBaseClient = async (dbid: string): Promise<QuickBase> => {
  let token: string | null = null;

  if (import.meta.env.MODE !== "development") {
    // Always generate a new temp token for non-development environments
    token = await generateTempToken(dbid);
  } else {
    // Use userToken for development
    token = import.meta.env.VITE_QUICKBASE_USER_TOKEN;
  }

  if (!token) {
    throw new Error(
      "Token is not available. Please check your environment variables."
    );
  }

  console.log("Using token:", token);

  return new QuickBase({
    realm: import.meta.env.VITE_QUICKBASE_REALM,
    userToken: import.meta.env.MODE === "development" ? token : undefined,
    tempToken: import.meta.env.MODE !== "development" ? token : undefined,
  });
};
