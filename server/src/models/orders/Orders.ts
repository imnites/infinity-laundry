import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';

export class Orders extends Model {}

export const OrdersDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  options: {}
};
