export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js
  public apiUrl = '<THE URL OF THE API TO CONSUME>';

  // Application Insights configuration
  public appInsights = {
    instrumentationKey: '<GOTTEN FROM AZURE PORTAL>'
  };

  // Azure AD configuration
  public azureAD = {
    clientId: '<GOTTEN FROM AZURE PORTAL>',
    tenantId: '<GOTTEN FROM AZURE PORTAL>',
    redirectUri: '<SAME AS IN AZURE PORTAL>',
    postLogoutRedirectUri: '<SAME AS IN AZURE PORTAL>',
    resourceUri: '<RESOURCE URI>',
    resourceScopes: ['<RESOURCE SCOPE>']
  };

  public signalR = {
    notificationHubUri: '<HUB URI FOR NOTIFICATIONS>',
    tripboardHubUri: '<HUB URI FOR TRIPBOARD>'
  };

  // Trimble Maps Key
  public trimbleMapsKey = '<KEY PURCHSED FROM TRIMBLE MAPS>';

  constructor() {}
}

export const EnvServiceFactory = () => {
  // Read environment variables from browser window
  const browserWindow: any = window || {};

  const browserWindowEnv = browserWindow['__env'] || {};

  // Assign environment variables from browser window to env
  // Properties from env.js overwrite defaults from the EnvService.
  const env: EnvService = JSON.parse(JSON.stringify(browserWindowEnv));
  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: []
};
