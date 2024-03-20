import {gql, useMutation} from '@apollo/client';
import {setTokenValue} from '~/utils';
import {Me} from './types';
import {getTokenValue} from '~/utils/token-utils';

const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      tokenType
      me {
        id
        email
        email
        phoneNumber {
          countryCode
          phoneNumber
        }
        lastName
        firstName
      }
    }
  }
`;

export const useRefreshToken = (onError?: () => void) => {
  const [refreshToken, {loading}] = useMutation(REFRESH_TOKEN);

  return {
    refreshToken: async (): Promise<Me | undefined> => {
      const {refreshToken: refreshTokenVal} = await getTokenValue();

      try {
        if (refreshTokenVal) {
          const {data} = await refreshToken({
            variables: {
              refreshToken: refreshTokenVal
            }
          });

          await setTokenValue({
            accessToken: data.refreshToken.accessToken,
            tokenType: data.refreshToken.tokenType,
            refreshToken: data.refreshToken.refreshToken
          });

          return data.refreshToken.me;
        }
      } catch (err) {
        onError && onError();
      }
    },
    loading
  };
};
