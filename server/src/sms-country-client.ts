import axios from 'axios';
import {
  smsCountryAuthKey,
  smsCountryAuthToken,
  smsCountryRootUrl
} from './config';
import { GraphQLError } from 'graphql';
import { PhoneNumber } from './types';
import { RedisClient } from './redis-client';

const OTP_EXPIRED_IN_SEC = 300;

const getKey = (phoneNumber: PhoneNumber): string =>
  `${phoneNumber.countryCode} ${phoneNumber.phoneNumber}`;

export class SMSCountryClient {
  private readonly _smsCountryAuthKey: string;

  private readonly _smsCountryAuthToken: string;

  private readonly _encodedAuthKey: string;

  private readonly _smsCountryRootUrl: string;

  private readonly _redisClient: RedisClient;

  public constructor(redisClient: RedisClient) {
    this._smsCountryAuthToken = smsCountryAuthToken;
    this._smsCountryAuthKey = smsCountryAuthKey;
    this._smsCountryRootUrl = smsCountryRootUrl;
    this._encodedAuthKey = Buffer.from(
      `${smsCountryAuthKey}:${smsCountryAuthToken}`
    ).toString('base64');
    this._redisClient = redisClient;
  }

  private static _generateOTP(): string {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const otp = Math.floor(100000 + Math.random() * 900000);
    return `${otp}`;
  }

  public async isPhoneNumberVerified(
    phoneNumber: PhoneNumber
  ): Promise<boolean> {
    const key = getKey(phoneNumber);
    const data = await this._redisClient.retrieveData<{ verified: boolean }>(
      key
    );

    return data !== null && data.verified;
  }

  public async validateOTP({
    phoneNumber,
    apiId: key,
    otp
  }: {
    phoneNumber: PhoneNumber;
    apiId: string;
    otp: string;
  }): Promise<{ phoneNumber: PhoneNumber; verified: boolean }> {
    const data = await this._redisClient.retrieveData<{
      phoneNumber: PhoneNumber;
      otp: string;
    }>(key);

    if (data === null) {
      throw new GraphQLError('OTP Expired');
    }

    const response = { phoneNumber, verified: false };

    if (
      data.otp === otp &&
      data.phoneNumber.countryCode === phoneNumber.countryCode &&
      data.phoneNumber.phoneNumber === phoneNumber.phoneNumber
    ) {
      await this._redisClient.deleteKey(key);
      await this._redisClient.saveData(getKey(phoneNumber), { verified: true });

      response.verified = true;
    }

    return response;
  }

  public async sendOTP({
    phoneNumber,
    SenderId
  }: {
    phoneNumber: PhoneNumber;
    SenderId?: string;
  }): Promise<{
    apiId: string;
    success: boolean;
  }> {
    const otp = SMSCountryClient._generateOTP();
    const text = `User Admin login OTP is ${otp} - SMSCOU`;

    const { apiId, success } = await this.sendSMS({
      phoneNumber,
      text,
      SenderId
    });

    await this._redisClient.saveData(
      apiId,
      {
        phoneNumber,
        otp
      },
      OTP_EXPIRED_IN_SEC
    );

    return {
      apiId,
      success
    };
  }

  public async sendSMS({
    phoneNumber,
    text,
    SenderId = 'SMSCOU'
  }: {
    phoneNumber: PhoneNumber;
    text: string;
    SenderId?: string;
  }): Promise<{
    apiId: string;
    success: boolean;
    message: string;
    messageUUID: string;
  }> {
    const url = `${this._smsCountryRootUrl}/Accounts/${this._smsCountryAuthKey}/SMSes/`;

    return axios
      .post(
        url,
        {
          Number: `${phoneNumber.countryCode}${phoneNumber.phoneNumber}`,
          Text: 'User Admin login OTP is ** - SMSCOU',
          SenderId,
          Tool: 'API'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this._encodedAuthKey}`
          }
        }
      )
      .then(
        ({
          data
        }: {
          data: {
            [key: string]: unknown;
          };
        }) => ({
          apiId: data.ApiId as string,
          success: data.Success === 'True',
          message: data.Message as string,
          messageUUID: data.MessageUUID as string
        })
      )
      .catch(
        ({
          response
        }: {
          response: { data: { error: string; error_description: string } };
        }) => {
          console.log(response);
          throw new GraphQLError(response.data.error, {
            extensions: { description: response.data.error_description }
          });
        }
      );
  }
}
