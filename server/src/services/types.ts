import { UserService } from './UserService';
import { ResourceService } from './ResourceService';

export type ServiceClients = {
  resourceService: ResourceService;
  userService: UserService;
};
