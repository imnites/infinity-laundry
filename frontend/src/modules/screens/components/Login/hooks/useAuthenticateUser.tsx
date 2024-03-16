import {gql, useMutation} from '@apollo/client';
import {NativeModules} from 'react-native';

const {SecureStorageModule} = NativeModules;

const Authenticate_User = gql`
  mutation authenticateUser($credential: Credential!) {
    authenticate(credential: $credential) {
      accessToken
      refreshToken
      tokenType
    }
  }
`;

interface CredentialType {
  userName: string;
  password: string;
}

const useAuthenticateUser = () => {
  const [authenticateUser, {loading, error}] = useMutation(Authenticate_User, {
    onCompleted: async ({authenticate}) => {
      SecureStorageModule.setValue('access-token', authenticate.accessToken);
      SecureStorageModule.setValue('refresh-token', authenticate.refreshToken);
      SecureStorageModule.setValue('token-type', authenticate.refreshToken);
    },
  });

  return {
    authenticateUser: async (credential: CredentialType) => {
      try {
        console.log('credential', credential);
        const {data} = await authenticateUser({
          variables: {credential: credential},
        });

        return data;
      } catch (err) {
        console.log(err);
        return {error: true};
      }
    },
    loading,
    error,
  };
};

export default useAuthenticateUser;
