import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';

export class Transaction extends Model {
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

export const TransactionDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    machineDetails: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currencyId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  options: {}
};
