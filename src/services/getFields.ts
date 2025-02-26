import { QuickBaseResponseGetFields } from "quickbase";
import { apiRequest } from "./apiRequest";

// Simplified function
export async function getFields(
  tableId: string,
  includeFieldPerms?: boolean
): Promise<QuickBaseResponseGetFields> {
  return apiRequest(tableId, async (quickbase) => {
    const results = await quickbase.getFields({
      tableId,
      includeFieldPerms,
    });
    return results;
  });
}
