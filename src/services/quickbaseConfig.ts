// // src/services/quickbaseConfig.ts
// import { QuickBase, QuickBaseOptions } from "quickbase";

// // Ensure this is a singleton by exporting an instance directly
// class QuickBaseService {
//   private instances: Map<string, QuickBase> = new Map();
//   private userToken: string = import.meta.env.VITE_QUICKBASE_USER_TOKEN || "";
//   private appToken: string = import.meta.env.VITE_QUICKBASE_APP_TOKEN || "";
//   private realm: string = import.meta.env.VITE_QUICKBASE_REALM || "";

//   private isProduction(): boolean {
//     return import.meta.env.MODE === "production";
//   }

//   private async createInstance(dbid: string): Promise<QuickBase> {
//     console.log(`Creating QuickBase instance for DBID: ${dbid}`);
//     console.log("Mode:", import.meta.env.MODE);
//     console.log("User Token:", this.userToken ? "Set" : "Not set");
//     console.log("App Token:", this.appToken ? "Set" : "Not set");
//     console.log("Realm:", this.realm);

//     const options: QuickBaseOptions = {
//       realm: this.realm,
//       autoRenewTempTokens: true,
//     };

//     if (this.isProduction()) {
//       options.appToken = this.appToken;
//     } else {
//       options.userToken = this.userToken;
//     }

//     const instance = new QuickBase(options);

//     if (this.isProduction()) {
//       try {
//         console.log(`Generating initial temp token for DBID: ${dbid}`);
//         const response = await instance.getTempTokenDBID({ dbid });
//         console.log("Temp token generated:", response.temporaryAuthorization);
//         instance.setTempToken(dbid, response.temporaryAuthorization);
//         console.log(`Temp token set for DBID: ${dbid}. Auto-renewal enabled.`);
//       } catch (error) {
//         console.error(`Failed to generate temp token for DBID: ${dbid}`, error);
//         throw error;
//       }
//     } else {
//       console.log(`Using user token for DBID: ${dbid} in development mode`);
//     }

//     return instance;
//   }

//   public async getInstanceForDbid(dbid: string): Promise<QuickBase> {
//     if (!this.instances.has(dbid)) {
//       const instance = await this.createInstance(dbid);
//       this.instances.set(dbid, instance);
//     } else {
//       console.log(`Reusing existing instance for DBID: ${dbid}`);
//     }
//     return this.instances.get(dbid)!;
//   }
// }

// export const quickbaseService = new QuickBaseService(); // Singleton instance

// // src/services/quickbaseConfig.ts
// import { QuickBase, QuickBaseOptions } from "quickbase";

// // Use a global Map to persist instances across code page executions
// const globalInstances: Map<string, QuickBase> =
//   (window as any).quickbaseInstances || new Map();
// (window as any).quickbaseInstances = globalInstances;

// class QuickBaseService {
//   private instances: Map<string, QuickBase> = globalInstances;
//   private userToken: string = import.meta.env.VITE_QUICKBASE_USER_TOKEN || "";
//   private appToken: string = import.meta.env.VITE_QUICKBASE_APP_TOKEN || "";
//   private realm: string = import.meta.env.VITE_QUICKBASE_REALM || "";

//   private isProduction(): boolean {
//     return import.meta.env.MODE === "production";
//   }

//   private async createInstance(dbid: string): Promise<QuickBase> {
//     console.log(`Creating QuickBase instance for DBID: ${dbid}`);
//     console.log("Mode:", import.meta.env.MODE);
//     console.log("User Token:", this.userToken ? "Set" : "Not set");
//     console.log("App Token:", this.appToken ? "Set" : "Not set");
//     console.log("Realm:", this.realm);

//     const options: QuickBaseOptions = {
//       realm: this.realm,
//       autoRenewTempTokens: true,
//     };

//     if (this.isProduction()) {
//       options.appToken = this.appToken;
//     } else {
//       options.userToken = this.userToken;
//     }

//     const instance = new QuickBase(options);

//     if (this.isProduction()) {
//       try {
//         console.log(`Generating initial temp token for DBID: ${dbid}`);
//         const response = await instance.getTempTokenDBID({ dbid });
//         console.log("Temp token generated:", response.temporaryAuthorization);
//         instance.setTempToken(dbid, response.temporaryAuthorization);
//         console.log(`Temp token set for DBID: ${dbid}. Auto-renewal enabled.`);
//       } catch (error) {
//         console.error(`Failed to generate temp token for DBID: ${dbid}`, error);
//         throw error;
//       }
//     } else {
//       console.log(`Using user token for DBID: ${dbid} in development mode`);
//     }

//     return instance;
//   }

//   public async getInstanceForDbid(dbid: string): Promise<QuickBase> {
//     if (!this.instances.has(dbid)) {
//       const instance = await this.createInstance(dbid);
//       this.instances.set(dbid, instance);
//     } else {
//       console.log(`Reusing existing instance for DBID: ${dbid}`);
//     }
//     return this.instances.get(dbid)!;
//   }
// }

// export const quickbaseService = new QuickBaseService();

// // src/services/quickbaseConfig.ts
// import { QuickBase, QuickBaseOptions } from "quickbase";

// // Global function to manage QuickBase instances
// if (!(window as any).getQuickBaseInstance) {
//   const instances: Map<string, QuickBase> = new Map();

//   (window as any).getQuickBaseInstance = async function (
//     dbid: string
//   ): Promise<QuickBase> {
//     const userToken: string = import.meta.env.VITE_QUICKBASE_USER_TOKEN || "";
//     const appToken: string = import.meta.env.VITE_QUICKBASE_APP_TOKEN || "";
//     const realm: string = import.meta.env.VITE_QUICKBASE_REALM || "";
//     const isProduction = import.meta.env.MODE === "production";

//     if (!instances.has(dbid)) {
//       console.log(`Creating QuickBase instance for DBID: ${dbid}`);
//       console.log("Mode:", import.meta.env.MODE);
//       console.log("User Token:", userToken ? "Set" : "Not set");
//       console.log("App Token:", appToken ? "Set" : "Not set");
//       console.log("Realm:", realm);

//       const options: QuickBaseOptions = {
//         realm: realm,
//         autoRenewTempTokens: true,
//       };

//       if (isProduction) {
//         options.appToken = appToken;
//       } else {
//         options.userToken = userToken;
//       }

//       const instance = new QuickBase(options);

//       if (isProduction) {
//         try {
//           console.log(`Generating initial temp token for DBID: ${dbid}`);
//           const response = await instance.getTempTokenDBID({ dbid });
//           console.log("Temp token generated:", response.temporaryAuthorization);
//           instance.setTempToken(dbid, response.temporaryAuthorization);
//           console.log(
//             `Temp token set for DBID: ${dbid}. Auto-renewal enabled.`
//           );
//         } catch (error) {
//           console.error(
//             `Failed to generate temp token for DBID: ${dbid}`,
//             error
//           );
//           throw error;
//         }
//       } else {
//         console.log(`Using user token for DBID: ${dbid} in development mode`);
//       }

//       instances.set(dbid, instance);
//     } else {
//       console.log(`Reusing existing instance for DBID: ${dbid}`);
//     }

//     return instances.get(dbid)!;
//   };
// }

// // Export a wrapper to use the global function
// export const quickbaseService = {
//   getInstanceForDbid: (window as any).getQuickBaseInstance,
// };

// src/services/quickbaseConfig.ts
import { QuickBase, QuickBaseOptions } from "quickbase";

// Simplified to avoid Map persistence issues in QuickBase code page
export const getQuickBaseInstance = async (
  dbid: string
): Promise<QuickBase> => {
  const userToken: string = import.meta.env.VITE_QUICKBASE_USER_TOKEN || "";
  const appToken: string = import.meta.env.VITE_QUICKBASE_APP_TOKEN || "";
  const realm: string = import.meta.env.VITE_QUICKBASE_REALM || "";
  const isProduction = import.meta.env.MODE === "production";

  console.log(`Creating or reusing QuickBase instance for DBID: ${dbid}`);
  console.log("Mode:", import.meta.env.MODE);
  console.log("User Token:", userToken ? "Set" : "Not set");
  console.log("App Token:", appToken ? "Set" : "Not set");
  console.log("Realm:", realm);

  const options: QuickBaseOptions = {
    realm: realm,
    autoRenewTempTokens: true,
  };

  if (isProduction) {
    options.appToken = appToken;
  } else {
    options.userToken = userToken;
  }

  const instance = new QuickBase(options);

  if (isProduction) {
    try {
      console.log(`Generating initial temp token for DBID: ${dbid}`);
      const response = await instance.getTempTokenDBID({ dbid });
      console.log("Temp token generated:", response.temporaryAuthorization);
      instance.setTempToken(dbid, response.temporaryAuthorization);
      console.log(`Temp token set for DBID: ${dbid}. Auto-renewal enabled.`);
    } catch (error) {
      console.error(`Failed to generate temp token for DBID: ${dbid}`, error);
      throw error;
    }
  } else {
    console.log(`Using user token for DBID: ${dbid} in development mode`);
  }

  return instance;
};

// Export as object for consistency with previous usage
export const quickbaseService = {
  getInstanceForDbid: getQuickBaseInstance,
};
