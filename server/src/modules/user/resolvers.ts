import { authenticate } from './authenticate';
import { createUser } from './create-user';
import { getMe } from './get-me';
import { logout } from './logout';
import { refreshToken } from './refresh-token';

export default {
  Mutation: {
    createUser: createUser,
    authenticate: authenticate,
    refreshToken: refreshToken,
    logout: logout
  },
  Query: {
    me: getMe
  }
};
