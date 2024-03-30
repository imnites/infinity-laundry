import { Database, Transaction } from '~/models';
import { AbstractDataType } from 'sequelize';

export class TransactionService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }

  public async getTransactionDetailsById(
    id: string
  ): Promise<Transaction | null> {
    return this._database.models.transaction.findByPk(id);
  }

  public async addTransaction({
    id,
    userId,
    type,
    machineDetails,
    amount,
    currencyId,
    timestamp,
    completed
  }: {
    id: AbstractDataType;
    userId: AbstractDataType;
    type: string;
    machineDetails: string;
    amount: number;
    currencyId: string;
    timestamp: string;
    completed: boolean;
  }): Promise<void> {
    const userInfo = this._database.models.transaction.build({
      id,
      userId,
      type,
      machineDetails,
      amount,
      currencyId,
      timestamp,
      completed
    });

    await userInfo.save();
  }
}
