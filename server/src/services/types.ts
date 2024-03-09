import { OrdersService } from './OrdersService';
import { ProductService } from './ProductService';

export enum ServiceClientsKeys {
  productServices = 'productServices',
  ordersServices = 'ordersServices'
}

export type ServiceClientsDef = OrdersService | ProductService;

export type ServiceClients = { [key in ServiceClientsKeys]: ServiceClientsDef };
