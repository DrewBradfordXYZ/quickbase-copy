import { QuickBaseResponseGetFields } from "quickbase";
import { apiRequest } from "./apiRequest";

// Function to list all fields of a table
export const tableFields = async (
  tableId: string,
  dbid: string
): Promise<QuickBaseResponseGetFields> => {
  return apiRequest(dbid, async (quickbase) => {
    const results = await quickbase.getFields({ tableId });
    return results;
  });
};
