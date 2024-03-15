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

  public async validateOTP({
    verificationToken: key,
    otp
  }: {
    verificationToken: string;
    otp: string;
  }): Promise<{
    phoneNumber: PhoneNumber | null;
    userId: string | null;
    verified: boolean;
  }> {
    const data = await this._redisClient.retrieveData<{
      phoneNumber: PhoneNumber;
      otp: string;
      userId: string;
    }>(key);

    if (data === null) {
      throw new GraphQLError('OTP Expired');
    }

    const response: {
      phoneNumber: PhoneNumber | null;
      userId: string | null;
      verified: boolean;
    } = { phoneNumber: null, userId: null, verified: false };

    if (data.otp === otp) {
      response.verified = true;
      response.phoneNumber = data.phoneNumber;
      response.userId = data.userId;

      await this._redisClient.deleteKey(key);
    }

    return response;
  }

  public async sendOTP({
    phoneNumber,
    SenderId,
    userId
  }: {
    phoneNumber: PhoneNumber;
    userId: string;
    SenderId?: string;
  }): Promise<{
    id: string;
    success: boolean;
    verificatonToken: string | null;
  }> {
    const otp = SMSCountryClient._generateOTP();
    const text = `User Admin login OTP is ${otp} - SMSCOU`;

    console.log(otp);

    const { apiId, success } = await this.sendSMS({
      phoneNumber,
      text,
      SenderId
    });

    const response: {
      id: string;
      success: boolean;
      verificatonToken: string | null;
    } = {
      id: apiId,
      success: success,
      verificatonToken: null
    };

    if (success) {
      const verificatonToken = crypto.randomUUID().toString();

      await this._redisClient.saveData(
        verificatonToken,
        {
          phoneNumber,
          otp,
          apiId,
          userId
        },
        OTP_EXPIRED_IN_SEC
      );

      response.verificatonToken = verificatonToken;
    }

    return response;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
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
    // const url = `${this._smsCountryRootUrl}/Accounts/${this._smsCountryAuthKey}/SMSes/`;

    return Promise.resolve({
      apiId: crypto.randomUUID(),
      success: true,
      message: text,
      messageUUID: crypto.randomUUID()
    });

    // return axios
    //   .post(
    //     url,
    //     {
    //       Number: `${phoneNumber.countryCode}${phoneNumber.phoneNumber}`,
    //       Text: 'User Admin login OTP is ** - SMSCOU',
    //       SenderId,
    //       Tool: 'API'
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Basic ${this._encodedAuthKey}`
    //       }
    //     }
    //   )
    //   .then(
    //     ({
    //       data
    //     }: {
    //       data: {
    //         [key: string]: unknown;
    //       };
    //     }) => ({
    //       apiId: data.ApiId as string,
    //       success: data.Success === 'True',
    //       message: data.Message as string,
    //       messageUUID: data.MessageUUID as string
    //     })
    //   )
    //   .catch(
    //     ({
    //       response
    //     }: {
    //       response: { data: { error: string; error_description: string } };
    //     }) => {
    //       console.log(response);
    //       throw new GraphQLError(response.data.error, {
    //         extensions: { description: response.data.error_description }
    //       });
    //     }
    //   );
  }
}
