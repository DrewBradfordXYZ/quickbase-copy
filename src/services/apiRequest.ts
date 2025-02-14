import { quickBaseClient } from "./quickBaseClient";

export const apiRequest = async <T>(
  requestFn: (quickbase: any) => Promise<T>
): Promise<T> => {
  try {
    const quickbase = await quickBaseClient();
    const results = await requestFn(quickbase);
    return results;
  } catch (err) {
    console.error("Error making API request:", err);
    throw err;
  }
};
