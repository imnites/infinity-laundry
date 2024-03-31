import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';
import { DECIMAL_PRECISON } from '../enum';

export enum TRANSACTION_STATUS {
  SUCCESS = 'SUCCESS',
  NOT_ATTEMPTED = 'NOT_ATTEMPTED',
  FAILED = 'FAILED',
  USER_DROPPED = 'USER_DROPPED',
  VOID = 'VOID',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING'
}

export enum TRANSACTION_TYPE {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export class Transactions extends Model {
  public get Id(): string {
    return this.getDataValue('id') as string;
  }

  public get UserId(): string {
    return this.getDataValue('userId') as string;
  }

  public get Type(): string {
    return this.getDataValue('type') as string;
  }

  public get MachineDetails(): string {
    return this.getDataValue('machineDetails') as string;
  }

  public get Amount(): number {
    return this.getDataValue('amount') as number;
  }

  public get CurrencyId(): string {
    return this.getDataValue('currencyId') as string;
  }

  public get Completed(): boolean {
    return this.getDataValue('status') as boolean;
  }
}

export const TransactionsDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(TRANSACTION_TYPE.CREDIT, TRANSACTION_TYPE.DEBIT),
      allowNull: false
    },
    transactionTime: { type: DataTypes.DATE, allowNull: false },
    transactionCompletionTime: { type: DataTypes.DATE, allowNull: true },
    amount: {
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
    status: {
      type: DataTypes.ENUM(
        TRANSACTION_STATUS.SUCCESS,
        TRANSACTION_STATUS.NOT_ATTEMPTED,
        TRANSACTION_STATUS.FAILED,
        TRANSACTION_STATUS.USER_DROPPED,
        TRANSACTION_STATUS.VOID,
        TRANSACTION_STATUS.CANCELLED,
        TRANSACTION_STATUS.PENDING
      ),
      allowNull: false
    },
    keyValue: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  },
  options: {
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ]
  }
};
