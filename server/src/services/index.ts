import { Database } from '~/models';
import { UserService } from './UserService';
import { ResourceService } from './ResourceService';
import { ServiceClients } from './types';

export const initServiceClients = (database: Database): ServiceClients => ({
  userService: new UserService(database),
  resourceService: new ResourceService(database)
});
