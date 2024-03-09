import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';
import { DECIMAL_PRECISON } from '../enum';
import { Product } from './Product';

export class ProductSKU extends Model {}

export const ProductSKUDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'id'
      }
    },
    featureKeyValues: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    quantityInStock: {
      type: DataTypes.DECIMAL(
        DECIMAL_PRECISON.precision,
        DECIMAL_PRECISON.scale
      ),
      allowNull: true
    },
    costPrice: {
      type: DataTypes.DECIMAL(
        DECIMAL_PRECISON.precision,
        DECIMAL_PRECISON.scale
      ),
      allowNull: true
    },
    purchasedPrice: {
      type: DataTypes.DECIMAL(
        DECIMAL_PRECISON.precision,
        DECIMAL_PRECISON.scale
      ),
      allowNull: true
    },
    sellingPrice: {
      type: DataTypes.DECIMAL(
        DECIMAL_PRECISON.precision,
        DECIMAL_PRECISON.scale
      ),
      allowNull: true
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  options: {
    indexes: [
      {
        unique: true,
        fields: ['id', 'featureKeyValues']
      }
    ]
  }
};
