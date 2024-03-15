import {gql, useMutation} from '@apollo/client';

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
  const [authenticateUser, {loading, error}] = useMutation(Authenticate_User);

  return {
    authenticateUser: async (credential: CredentialType) => {
      try {
        const {data} = await authenticateUser({
          variables: {credential: credential},
        });

        return data;
      } catch (err) {
        return {error: true};
      }
    },
    loading,
    error,
  };
};

export default useAuthenticateUser;
