import { UserService } from './UserService';
import { ResourceService } from './ResourceService';
import { TemplateService } from './TemplateService';

export type ServiceClients = {
  resourceService: ResourceService;
  userService: UserService;
  templateService: TemplateService;
};
