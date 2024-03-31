import { UserService } from './UserService';
import { ResourceService } from './ResourceService';
import { TransactionsService } from './TransactionsService';

export type ServiceClients = {
  resourceService: ResourceService;
  userService: UserService;
  transactionsService: TransactionsService;
};
