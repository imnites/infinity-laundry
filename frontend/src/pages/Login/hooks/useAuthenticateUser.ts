import {gql, useMutation} from '@apollo/client';
import {setTokenValue} from '~/utils';
import {ME_FRAGMENT} from '~/me';

const Authenticate_User = gql`
  ${ME_FRAGMENT}
  mutation authenticateUser($credential: Credential!) {
    authenticate(credential: $credential) {
      accessToken
      refreshToken
      tokenType
      me {
        ...MeFragment
      }
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
      await setTokenValue({
        accessToken: authenticate.accessToken,
        refreshToken: authenticate.refreshToken,
        tokenType: authenticate.tokenType
      });
    }
  });

  return {
    authenticateUser: async (credential: CredentialType) => {
      try {
        const {data} = await authenticateUser({
          variables: {credential: credential}
        });

        return {error: false, me: data.authenticate.me};
      } catch (err) {
        return {error: true};
      }
    },
    loading,
    error
  };
};

export default useAuthenticateUser;
