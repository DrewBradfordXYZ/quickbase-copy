import { QuickBaseResponseGetFields } from "quickbase";
import { AxiosResponse } from "axios";
import { apiRequest } from "./apiRequest";

// Overload signatures
export async function getFields(
  tableId: string,
  includeFieldPerms?: boolean,
  requestOptions?: object,
  returnAxios?: false | undefined
): Promise<QuickBaseResponseGetFields>;

export async function getFields(
  tableId: string,
  includeFieldPerms?: boolean,
  requestOptions?: object,
  returnAxios?: true
): Promise<AxiosResponse<QuickBaseResponseGetFields>>;

// Implementation
export async function getFields(
  tableId: string,
  includeFieldPerms?: boolean,
  requestOptions?: object,
  returnAxios?: boolean
): Promise<
  QuickBaseResponseGetFields | AxiosResponse<QuickBaseResponseGetFields>
> {
  if (returnAxios === true) {
    return apiRequest(tableId, async (quickbase) => {
      const results = await quickbase.getFields({
        tableId,
        includeFieldPerms,
        requestOptions,
        returnAxios: true,
      });
      return results;
    });
  } else {
    return apiRequest(tableId, async (quickbase) => {
      const results = await quickbase.getFields({
        tableId,
        includeFieldPerms,
        requestOptions,
        returnAxios: undefined,
      });
      return results;
    });
  }
}
