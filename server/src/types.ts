import { KeycloakClient } from './keycloak-client';
import { KeycloakPublicClient } from './keycloak-public-client';
import { Database } from './models';
import { RedisClient } from './redis-client';
import { ServiceClients } from './services/types';
import { SMSCountryClient } from './sms-country-client';

export type PhoneNumber = {
  countryCode: string;
  phoneNumber: string;
};

export type Context = {
  database: Database;
  serviceClients: ServiceClients;
  keyCloakPublicClient: KeycloakPublicClient;
  keycloakClient: KeycloakClient;
  sMSCountryClient: SMSCountryClient;
  redisClient: RedisClient;
};
