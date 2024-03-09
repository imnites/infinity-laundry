import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';
import { FeatureCategory } from './FeatureCategory';

export class FeatureLabel extends Model {}

export const FeatureLabelDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    featureCategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: FeatureCategory,
        key: 'id'
      }
    }
  },
  options: {
    indexes: [
      {
        unique: true,
        fields: ['name', 'featureCategoryId']
      }
    ]
  }
};
