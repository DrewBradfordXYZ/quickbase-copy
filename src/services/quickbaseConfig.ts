// src/services/quickbaseConfig.ts
import { QuickBase, QuickBaseOptions } from "quickbase";

class QuickBaseService {
  private instance: QuickBase | null = null;
  private userToken: string = import.meta.env.VITE_QUICKBASE_USER_TOKEN || "";
  private appToken: string = import.meta.env.VITE_QUICKBASE_APP_TOKEN || "";
  private realm: string = import.meta.env.VITE_QUICKBASE_REALM || "";
  private appDbid: string = import.meta.env.VITE_QUICKBASE_APP_DBID || "";

  private isProduction(): boolean {
    return import.meta.env.MODE === "production";
  }

  public async getInstance(): Promise<QuickBase> {
    if (!this.instance) {
      console.log("Initializing QuickBase instance...");
      console.log("Mode:", import.meta.env.MODE);
      console.log("User Token:", this.userToken ? "Set" : "Not set");
      console.log("App Token:", this.appToken ? "Set" : "Not set");
      console.log("Realm:", this.realm);
      console.log("App DBID:", this.appDbid);

      const options: QuickBaseOptions = {
        realm: this.realm,
        autoRenewTempTokens: true,
      };

      if (this.isProduction()) {
        options.appToken = this.appToken;
      } else {
        options.userToken = this.userToken;
      }

      this.instance = new QuickBase(options);
    }
    return this.instance;
  }

  public async getInstanceWithTempToken(dbid: string): Promise<QuickBase> {
    const qb = await this.getInstance();

    if (this.isProduction()) {
      try {
        console.log("Generating temp token for DBID:", dbid);
        const response = await qb.getTempTokenDBID({ dbid });
        console.log("Temp token generated:", response.temporaryAuthorization);
        qb.setTempToken(dbid, response.temporaryAuthorization);
      } catch (error) {
        console.error("Failed to generate temp token for DBID:", dbid, error);
        throw error;
      }
    }

    return qb;
  }
}

export const quickbaseService = new QuickBaseService();
