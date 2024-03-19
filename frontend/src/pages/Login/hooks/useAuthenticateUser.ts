import {gql, useMutation} from '@apollo/client';
import {NativeModules} from 'react-native';
import {useMeContext} from '~/me';

const {SecureStorageModule} = NativeModules;

const Authenticate_User = gql`
  mutation authenticateUser($credential: Credential!) {
    authenticate(credential: $credential) {
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

interface CredentialType {
  userName: string;
  password: string;
}

const useAuthenticateUser = () => {
  const {setMe} = useMeContext();
  const [authenticateUser, {loading, error}] = useMutation(Authenticate_User, {
    onCompleted: async ({authenticate}) => {
      SecureStorageModule.setValue('access-token', authenticate.accessToken);
      SecureStorageModule.setValue('refresh-token', authenticate.refreshToken);
      SecureStorageModule.setValue('token-type', authenticate.tokenType);
      setMe && setMe(authenticate.me);
    }
  });

  return {
    authenticateUser: async (credential: CredentialType) => {
      try {
        const {data} = await authenticateUser({
          variables: {credential: credential}
        });

        return data;
      } catch (err) {
        return {error: true};
      }
    },
    loading,
    error
  };
};

export default useAuthenticateUser;
