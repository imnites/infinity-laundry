import { Database, UserInfo } from '~/models';
import { PhoneNumber } from '~/types';
import { AbstractDataType } from 'sequelize';

export class UserService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }

  public async getUserDetailsByPhoneNumber(
    phoneNumber: PhoneNumber
  ): Promise<UserInfo | null> {
    return this._database.models.userInfo.findOne({
      where: {
        phoneNumber: `${phoneNumber.countryCode} ${phoneNumber.phoneNumber}`
      },
      order: [['createdAt', 'DESC']]
    });
  }

  public async getUserDetailsByEmail(email: string): Promise<UserInfo | null> {
    return this._database.models.userInfo.findOne({
      where: {
        email
      },
      order: [['createdAt', 'DESC']]
    });
  }

  public async getUserDetailsById(id: string): Promise<UserInfo | null> {
    return this._database.models.userInfo.findByPk(id);
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
