import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';
import { FeatureLabel } from './FeatureLabel';

export class Feature extends Model {}

export const FeatureDef: ModelDef = {
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
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  options: {
    indexes: [
      {
        unique: true,
        fields: ['id', 'featureLabelId']
      }
    ]
  }
};
