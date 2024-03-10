import { KeycloakClient } from './keycloak-client';
import { KeycloakPublicClient } from './keycloak-public-client';
import { Database } from './models';
import { ServiceClients } from './services/types';

export type Context = {
  database: Database;
  serviceClients: ServiceClients;
  keyCloakPublicClient: KeycloakPublicClient;
  keycloakClient: KeycloakClient;
};
