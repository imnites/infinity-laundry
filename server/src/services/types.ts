import { UserService } from './UserService';
import { ResourceService } from './ResourceService';

export enum ServiceClientsKeys {
  resourceService = 'resourceService',
  userService = 'userService'
}

export type ServiceClientsDef = ResourceService | UserService;

export type ServiceClients = { [key in ServiceClientsKeys]: ServiceClientsDef };
