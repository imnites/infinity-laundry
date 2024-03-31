import { UserService } from './UserService';
import { ResourceService } from './ResourceService';
import { TransactionsService } from './TransactionsService';
import { TemplateService } from './TemplateService';

export type ServiceClients = {
  resourceService: ResourceService;
  userService: UserService;
  transactionsService: TransactionsService;
  templateService: TemplateService;
};
