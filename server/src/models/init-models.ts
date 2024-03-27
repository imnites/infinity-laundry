import { Sequelize } from 'sequelize';
import { Models } from './types';
import Bluebird from 'bluebird';
import { UserInfo, UserInfoDef } from './user';
import { Resource, ResourceDef } from './resource';
import { addRelationship } from './model-relationship';
import { Payment, PaymentDef } from './payment';

export const initModels = async (sequelize: Sequelize): Promise<Models> => {
  const defaultOptions = {
    freezeTableName: true,
    sequelize
  };

  const models: Models = await Bluebird.Promise.props({
    userInfo: UserInfo.init(UserInfoDef.fields, {
      ...defaultOptions,
      ...UserInfoDef.options
    }),
    resource: Resource.init(ResourceDef.fields, {
      ...defaultOptions,
      ...ResourceDef.options
    }),
    payment: Payment.init(PaymentDef.fields, {
      ...defaultOptions,
      ...PaymentDef.options
    })
  });

  await addRelationship(models);

  return models;
};
