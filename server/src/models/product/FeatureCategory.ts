import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';

export class FeatureCategory extends Model {}

export const FeatureCategoryDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  options: {}
};
