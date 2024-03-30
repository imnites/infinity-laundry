import { ModelAttributeColumnOptions, ModelOptions } from 'sequelize';
import { UserInfo } from './user';
import { Resource } from './resource';
import { Payment } from './payment';
import { Sequelize } from 'sequelize';

export type ModelDef = {
  fields: {
    [prop: string]: ModelAttributeColumnOptions;
  };
  options: ModelOptions;
};

// export enum ModelKeys {
//   userInfo = 'userInfo',
//   resource = 'resource'
// }

// export type ModelRef = typeof Resource | typeof UserInfo;

export type Models = {
  userInfo: typeof UserInfo;
  resource: typeof Resource;
  payment: typeof Payment;
};

export type Database = {
  sequelize: Sequelize;
  models: Models;
};
