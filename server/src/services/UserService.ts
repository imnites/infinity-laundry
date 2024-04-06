import { Database, UserInfo } from '~/models';
import { PhoneNumber } from '~/types';
import { AbstractDataType, Op } from 'sequelize';

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

  public async getUserDetailsByEmailOrPhoneNumber({
    email,
    phoneNumber
  }: {
    email?: string;
    phoneNumber?: PhoneNumber;
  }): Promise<UserInfo | null> {
    if (!email && !phoneNumber) {
      throw new Error('please pass email or phone number or both');
    }

    if (email && phoneNumber) {
      return this._database.models.userInfo.findOne({
        where: {
          [Op.or]: [
            { email },
            {
              phoneNumber: `${phoneNumber.countryCode} ${phoneNumber.phoneNumber}`
            }
          ]
        },
        order: [['createdAt', 'DESC']]
      });
    }

    if (email) {
      return this.getUserDetailsByEmail(email);
    }

    if (phoneNumber) {
      return this.getUserDetailsByPhoneNumber(phoneNumber);
    }

    return null;
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
