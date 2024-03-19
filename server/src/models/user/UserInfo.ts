import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';
import { PhoneNumber } from '~/types';

export class UserInfo extends Model {
  public get Id(): string {
    return this.getDataValue('id') as string;
  }

  public get Email(): string {
    return this.getDataValue('email') as string;
  }

  public get Name(): string {
    return `${this.getDataValue('firstName') as string} ${this.getDataValue('lastName') as string}`;
  }

  public get PhoneNumber(): PhoneNumber {
    const phoneNumber = this.getDataValue('phoneNumber') as string;

    return {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      countryCode: phoneNumber.split(' ')[0],
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      phoneNumber: phoneNumber.split(' ')[1]
    };
  }
}

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
