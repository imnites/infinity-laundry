import { ModelAttributeColumnOptions, ModelOptions } from 'sequelize';
import { UserInfo } from './user';
import { Resource } from './resource';
import { Transactions } from './transactions';
import { Template } from './template';
import { Sequelize } from 'sequelize';

export type ModelDef = {
  fields: {
    [prop: string]: ModelAttributeColumnOptions;
  };
  options: ModelOptions;
};

export type Models = {
  userInfo: typeof UserInfo;
  resource: typeof Resource;
  transactions: typeof Transactions;
  template: typeof Template;
};

export type Database = {
  sequelize: Sequelize;
  models: Models;
};

export type CurrencyType = {
  id: string;
  name: string;
  code: string;
  symbol: string;
};
