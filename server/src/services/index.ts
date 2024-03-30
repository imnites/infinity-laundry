import { Database } from '~/models';
import { UserService } from './UserService';
import { ResourceService } from './ResourceService';
import { ServiceClients } from './types';
import { TemplateService } from './TemplateService';

export const initServiceClients = (database: Database): ServiceClients => ({
  userService: new UserService(database),
  resourceService: new ResourceService(database),
  templateService: new TemplateService(database)
});
