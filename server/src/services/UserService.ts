import { Database } from '~/models';
import { PhoneNumber } from '~/types';
import { AbstractDataType } from 'sequelize';

export class UserService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }

  public async createNewUser({
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    enabled
  }: {
    id: AbstractDataType;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: PhoneNumber;
    enabled: boolean;
  }): Promise<void> {
    const userInfo = this._database.models.userInfo.build({
      id,
      firstName,
      lastName,
      email,
      phoneNumber: `${phoneNumber.countryCode} ${phoneNumber.phoneNumber}`,
      enabled: enabled
    });

    await userInfo.save();
  }
}
