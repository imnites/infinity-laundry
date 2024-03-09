import { Sequelize } from 'sequelize';
import { Models } from './types';
import Bluebird from 'bluebird';
import {
  FeatureCategory,
  FeatureCategoryDef,
  FeatureLabel,
  FeatureLabelDef,
  Feature,
  FeatureDef,
  ProductFeature,
  ProductFeatureDef,
  ProductSKU,
  ProductSKUDef,
  ProductSKUDetails,
  ProductSKUDetailsDef,
  Product,
  productDef
} from './product';
import { Orders, OrdersDef } from './orders';
import { addRelationship } from './model-relationship';

export const initModels = async (sequelize: Sequelize): Promise<Models> => {
  const defaultOptions = {
    freezeTableName: true,
    sequelize
  };

  const models: Models = await Bluebird.Promise.props({
    product: Product.init(productDef.fields, {
      ...defaultOptions,
      ...productDef.options
    }),
    featureCategory: FeatureCategory.init(FeatureCategoryDef.fields, {
      ...defaultOptions,
      ...FeatureCategoryDef.options
    }),
    featureLabel: FeatureLabel.init(FeatureLabelDef.fields, {
      ...defaultOptions,
      ...FeatureLabelDef.options
    }),
    feature: Feature.init(FeatureDef.fields, {
      ...defaultOptions,
      ...FeatureDef.options
    }),
    productFeature: ProductFeature.init(ProductFeatureDef.fields, {
      ...defaultOptions,
      ...ProductFeatureDef.options
    }),
    productSKU: ProductSKU.init(ProductSKUDef.fields, {
      ...defaultOptions,
      ...ProductSKUDef.options
    }),
    productSKUDetails: ProductSKUDetails.init(ProductSKUDetailsDef.fields, {
      ...defaultOptions,
      ...ProductSKUDetailsDef.options
    }),
    orders: Orders.init(OrdersDef.fields, {
      ...defaultOptions,
      ...OrdersDef.options
    })
  });

  await addRelationship(models);

  return models;
};
