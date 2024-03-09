import { Database } from '~/models';
import { ProductService } from './ProductService';
import { OrdersService } from './OrdersService';
import { ServiceClients } from './types';

export const initServiceClients = (database: Database): ServiceClients => ({
  productServices: new ProductService(database),
  ordersServices: new OrdersService(database)
});
