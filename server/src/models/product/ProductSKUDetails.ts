import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';
import { ProductSKU } from './ProductSKU';
import { ProductFeature } from './ProductFeature';

export class ProductSKUDetails extends Model {}

export const ProductSKUDetailsDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    productSKUId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ProductSKU,
        key: 'id'
      }
    },
    productFeatureId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ProductFeature,
        key: 'id'
      }
    }
  },
  options: {
    indexes: [
      {
        unique: true,
        fields: ['productSKUId', 'productFeatureId']
      }
    ]
  }
};
