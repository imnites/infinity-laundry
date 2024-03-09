import { authenticate } from './authenticate';
import { createUser } from './create-user';
import { refreshToken } from './refresh-token';

export default {
  Mutation: {
    createUser: createUser,
    authenticate: authenticate,
    refreshToken: refreshToken
  }
};
