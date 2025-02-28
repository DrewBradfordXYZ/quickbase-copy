// // src/hooks/useQuickBase.ts
// import { useCallback } from "react";
// import { quickbaseService } from "../services/quickbaseConfig";
// import { QuickBase } from "quickbase";

// export const useQuickBase = () => {
//   const getInstanceForDbid = useCallback(
//     async (dbid: string): Promise<QuickBase> => {
//       return await quickbaseService.getInstanceForDbid(dbid);
//     },
//     []
//   );

//   return {
//     getInstanceForDbid, // Single method for any DBID
//   };
// };

// // src/hooks/useQuickBase.ts
// import { useCallback } from "react";
// import { quickbaseService } from "../services/quickbaseConfig";
// import { QuickBase } from "quickbase";

// export const useQuickBase = () => {
//   const getInstanceForDbid = useCallback(
//     async (dbid: string): Promise<QuickBase> => {
//       return await quickbaseService.getInstanceForDbid(dbid);
//     },
//     []
//   );

//   return {
//     getInstanceForDbid,
//   };
// };
// src/hooks/useQuickBase.ts
import { useCallback } from "react";
import { quickbaseService } from "../services/quickbaseConfig";
import { QuickBase } from "quickbase";

export const useQuickBase = () => {
  const getInstanceForDbid = useCallback(
    async (dbid: string): Promise<QuickBase> => {
      return await quickbaseService.getInstanceForDbid(dbid);
    },
    []
  );

  return {
    getInstanceForDbid,
  };
};
