import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';

export class UserInfo extends Model {}

export const UserInfoDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  options: {}
};
