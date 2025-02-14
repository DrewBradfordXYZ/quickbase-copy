declare module "quickbase" {
  export class QuickBase {
    constructor(options: {
      realm: string;
      userToken?: string;
      tempToken?: string;
      appToken?: string;
    });
    getApp(options: { appId: string }): Promise<any>;
    // Add the new method
    getTempTokenDBID(options: {
      dbid: string;
    }): Promise<{ temporaryAuthorization: string }>;
    // Add other methods as needed
  }
}
