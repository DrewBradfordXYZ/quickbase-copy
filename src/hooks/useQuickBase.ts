// src/hooks/useQuickBase.ts
import { useCallback } from "react";
import { quickbaseService } from "../services/quickbaseConfig";
import { QuickBase } from "quickbase";

export const useQuickBase = () => {
  // Basic QB instance (uses user token in dev, no temp token in prod)
  const getQBInstance = useCallback(() => {
    return quickbaseService.getInstance();
  }, []);

  // QB instance with temp token for specific dbid (production only)
  const getQBInstanceForTable = useCallback(
    async (dbid: string): Promise<QuickBase> => {
      return await quickbaseService.getInstanceWithTempToken(dbid);
    },
    []
  );

  return {
    getQBInstance, // For general QB operations
    getQBInstanceForTable, // For table-specific operations
  };
};
