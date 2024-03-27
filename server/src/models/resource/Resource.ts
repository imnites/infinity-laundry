import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';

export class Resource extends Model {}

export const ResourceDef: ModelDef = {
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
    type: {
      type: DataTypes.ENUM('WASHER', 'DRYER'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // location: {
    //   type: DataTypes.GEOMETRY('POINT'),
    //   allowNull: false
    // },
    status: {
      type: DataTypes.ENUM('FUNCTIONAL', 'NON_FUNCTIONAL'),
      allowNull: false
    }
  },
  options: {}
};
