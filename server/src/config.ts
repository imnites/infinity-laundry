import dotenv from 'dotenv';

dotenv.config();

export const connectionString = process.env.CONNECTION_STRING ?? '';
export const schema = process.env.SCHEMA ?? '';
export const nodeEnv = process.env.NODE_ENV ?? 'development';
export const keycloakClientId = process.env.KEYCLOAK_CLIENT_ID ?? '';
export const keycloakClientSecret = process.env.KEYCLOAK_CLIENT_SECRET ?? '';
export const keycloakPublicClientId =
  process.env.KEYCLOAK_PUBLIC_CLIENT_ID ?? '';
export const keycloakRootUrl = process.env.KEYCLOAK_ROOT_URL ?? '';
export const keycloakREALM = process.env.REALM ?? '';
export const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID ?? '';
export const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN ?? '';
export const smsCountryAuthKey = process.env.SMS_COUNTRY_AUTHKEY ?? '';
export const smsCountryAuthToken = process.env.SMS_COUNTRY_AuthToken ?? '';
export const smsCountryRootUrl = process.env.SMS_COUNTRY_ROOT_URL ?? '';
export const redisServerURL = process.env.REDIS_END_POINT ?? '';
