import {
  Database,
  Transactions,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE
} from '~/models';
import { AbstractDataType, Op, Sequelize, Transaction } from 'sequelize';

export class TransactionsService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }

  public async getPageTransactionsFilteredByTransactionsSearch({
    dateRange: { startDate, endDate },
    statuses
  }: {
    dateRange: {
      startDate: string;
      endDate: string;
    };
    statuses: TRANSACTION_STATUS[];
  }) {
    const response = await this._database.models.transactions.findAll({
      where: {
        transactionCompletionTime: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        },
        status: {
          [Op.in]: statuses
        }
      }
    });

    return response;
  }

  public async getTransactionById(id: string): Promise<Transactions | null> {
    return this._database.models.transactions.findByPk(id);
  }

  public async createNewTransaction({
    userId,
    type,
    amount,
    currencyCode,
    transactionTime,
    transactionCompletionTime,
    status,
    keyValue
  }: {
    userId: AbstractDataType;
    type: TRANSACTION_TYPE;
    amount: number;
    currencyCode: string;
    transactionTime: string;
    transactionCompletionTime?: string;
    status: TRANSACTION_STATUS;
    keyValue?: {
      [key: string]: unknown;
    };
  }): Promise<string | null> {
    return new Promise((resolve) => {
      this._database.sequelize.transaction(
        { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
        async (t: Transaction) => {
          try {
            if (
              type === TRANSACTION_TYPE.CREDIT &&
              status === TRANSACTION_STATUS.SUCCESS
            ) {
              await this._database.models.userInfo.update(
                {
                  balance: Sequelize.literal(`balance + ${amount}`)
                },
                { where: { id: userId }, transaction: t }
              );
            } else if (
              type === TRANSACTION_TYPE.DEBIT &&
              status === TRANSACTION_STATUS.SUCCESS
            ) {
              const userOb = await this._database.models.userInfo.findOne({
                where: { id: userId }
              });

              userOb?.setDataValue('balance', userOb.Balance.amount - amount);

              await userOb?.validate();

              await userOb?.save({ transaction: t });
            }

            const transaction = this._database.models.transactions.build({
              userId,
              type,
              amount,
              currencyCode,
              transactionTime,
              transactionCompletionTime,
              status,
              keyValue
            });

            const ob = await transaction.save({ transaction: t });
            resolve(ob.Id);
          } catch (ex) {
            console.log(ex);
            resolve(null);
          }
        }
      );
    });
  }
}
