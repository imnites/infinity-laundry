import {gql, useMutation} from '@apollo/client';
import {NativeModules} from 'react-native';
import {setTokenValue} from '~/utils';
import {Me} from '~/modules/me/useMe';

const {SecureStorageModule} = NativeModules;

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
      const refreshTokenVal = await SecureStorageModule.getValue(
        'refresh-token'
      );

      try {
        if (refreshTokenVal) {
          const {data} = await refreshToken({
            variables: {
              refreshToken: refreshTokenVal
            }
          });

          setTokenValue({
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
