export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:5001/api/v1',
  featureFlags: {
    identity: true,
    masters: true,
    crm: false,
    imports: false,
    exports: false,
    transport: false,
    contracts: false,
    finance: false,
    sez: false,
    reports: false
  },
  auth: {
    tokenKey: 'lt_erp_token',
    refreshTokenKey: 'lt_erp_refresh_token',
    tokenExpirationKey: 'lt_erp_token_expiration'
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100]
  },
  dateFormat: 'dd/MM/yyyy',
  timeFormat: 'HH:mm:ss',
  currency: 'INR',
  locale: 'en-IN'
};