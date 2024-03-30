import { Database, Payment } from '~/models';
import { AbstractDataType } from 'sequelize';

export class PaymentService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }

  public async getPaymentDetailsById(id: string): Promise<Payment | null> {
    return this._database.models.payment.findByPk(id);
  }

  public async addPayment({
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
    const userInfo = this._database.models.payment.build({
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
