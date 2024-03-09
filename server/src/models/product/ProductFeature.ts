import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';
import { FeatureLabel } from './FeatureLabel';
import { Feature } from './Feature';

export class ProductFeature extends Model {}

export const ProductFeatureDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    featureLabelId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: FeatureLabel,
        key: 'id'
      }
    },
    featureId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Feature,
        key: 'id'
      }
    }
  },
  options: {
    indexes: [
      {
        unique: true,
        fields: ['featureLabelId', 'featureId']
      }
    ]
  }
};
