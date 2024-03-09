import { ModelAttributeColumnOptions, ModelOptions } from 'sequelize';
import {
  Feature,
  FeatureCategory,
  FeatureLabel,
  Product,
  ProductFeature,
  ProductSKU,
  ProductSKUDetails
} from './product';
import { Orders } from './orders';
import { Sequelize } from 'sequelize';

export type ModelDef = {
  fields: {
    [prop: string]: ModelAttributeColumnOptions;
  };
  options: ModelOptions;
};

export enum ModelKeys {
  feature = 'feature',
  featureCategory = 'featureCategory',
  featureLabel = 'featureLabel',
  orders = 'orders',
  product = 'product',
  productFeature = 'productFeature',
  productSKU = 'productSKU',
  productSKUDetails = 'productSKUDetails'
}

export type ModelRef =
  | typeof Feature
  | typeof FeatureCategory
  | typeof FeatureLabel
  | typeof Orders
  | typeof Product
  | typeof ProductFeature
  | typeof ProductSKU
  | typeof ProductSKUDetails;

export type Models = {
  [key in ModelKeys]: ModelRef;
};

export type Database = {
  sequelize: Sequelize;
  models: Models;
};
