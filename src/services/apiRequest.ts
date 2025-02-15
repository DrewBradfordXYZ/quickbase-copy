import { QuickBase } from "quickbase";
import { quickBaseClient } from "./quickBaseClient";

export const apiRequest = async <T>(
  dbid: string,
  requestFn: (quickbase: QuickBase) => Promise<T>
): Promise<T> => {
  const quickbase = await quickBaseClient(dbid);
  try {
    const response = await requestFn(quickbase);
    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
