import {gql, useMutation} from '@apollo/client';
import {setTokenValue} from '~/utils';
import {Me} from './types';
import {getTokenValue} from '~/utils/token-utils';
import {ME_FRAGMENT} from '.';

const REFRESH_TOKEN = gql`
  ${ME_FRAGMENT}
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      tokenType
      me {
        ...MeFragment
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
