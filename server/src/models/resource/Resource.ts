import { DataTypes, Model } from 'sequelize';
import { CurrencyType, ModelDef } from '../types';
import { DECIMAL_PRECISON } from '../enum';
import { currenciesByCode } from '../const';

export enum MACHINE_TYPE {
  WASHER = 'WASHER',
  DRYER = 'DRYER'
}

export enum MACHINE_STATUS {
  FUNCTIONAL = 'FUNCTIONAL',
  NON_FUNCTIONAL = 'NON_FUNCTIONAL'
}

export class Resource extends Model {
  public get Id(): string {
    return this.getDataValue('id') as string;
  }

  public get Code(): string {
    return this.getDataValue('code') as string;
  }

  public get Name(): string {
    return this.getDataValue('name') as string;
  }

  public get AmountPerUse(): { amount: number; currency: CurrencyType } {
    const amountPerUse = this.getDataValue('amountPerUse') as number;
    const currencyCode = this.getDataValue('currencyCode') as string;

    return {
      amount: amountPerUse,
      currency: currenciesByCode[currencyCode]
    };
  }

  public get Type(): MACHINE_TYPE {
    return this.getDataValue('type') as MACHINE_TYPE;
  }

  public get Status(): MACHINE_STATUS {
    return this.getDataValue('status') as MACHINE_STATUS;
  }

  public get Enabled(): boolean {
    return this.getDataValue('enabled') as boolean;
  }

  public get KeyValues(): { [key: string]: unknown } | null {
    return this.getDataValue('keyValues') as { [key: string]: unknown } | null;
  }
}

export const ResourceDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amountPerUse: {
      type: DataTypes.DECIMAL(
        DECIMAL_PRECISON.precision,
        DECIMAL_PRECISON.scale
      ),
      allowNull: false
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(MACHINE_TYPE.WASHER, MACHINE_TYPE.DRYER),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(
        MACHINE_STATUS.FUNCTIONAL,
        MACHINE_STATUS.NON_FUNCTIONAL
      ),
      allowNull: false,
      defaultValue: MACHINE_STATUS.FUNCTIONAL
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    keyValues: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  },
  options: {}
};
