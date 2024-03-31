import { DataTypes, Model } from 'sequelize';
import { CurrencyType, ModelDef } from '../types';
import { PhoneNumber } from '~/types';
import { DECIMAL_PRECISON } from '../enum';
import { baseCurrency, currenciesByCode } from '../const';

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

  public get FirstName(): string {
    return this.getDataValue('firstName') as string;
  }

  public get LastName(): string {
    return this.getDataValue('lastName') as string;
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

  public get Enabled(): boolean {
    return this.getDataValue('enabled') as boolean;
  }

  public get Balance(): { amount: number; currency: CurrencyType } {
    const amount = this.getDataValue('balance') as number;
    const currencyCode = this.getDataValue('currencyCode') as string;

    return {
      amount,
      currency: currenciesByCode[currencyCode]
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
    balance: {
      type: DataTypes.DECIMAL(
        DECIMAL_PRECISON.precision,
        DECIMAL_PRECISON.scale
      ),
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 }
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: baseCurrency.code
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  options: {}
};
