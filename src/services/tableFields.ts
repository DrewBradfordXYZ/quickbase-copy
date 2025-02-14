import { QuickBaseResponseGetFields } from "quickbase";
import { apiRequest } from "./apiRequest";

// Function to list all fields of a table
export const tableFields = async (
  tableId: string
): Promise<QuickBaseResponseGetFields> => {
  return apiRequest(async (quickbase) => {
    const results = await quickbase.getFields({ tableId });
    return results;
  });
};
