import {gql, useMutation} from '@apollo/client';
import {deleteTokenValue, getTokenValue} from '~/utils';

const LOGOUT = gql`
  mutation logout($refreshToken: String) {
    logout(refreshToken: $refreshToken)
  }
`;

const useLogout = () => {
  const [logout, {loading}] = useMutation(LOGOUT);

  return {
    logout: async (onSuccess?: () => void, onError?: () => void) => {
      const {refreshToken} = await getTokenValue();
      try {
        await logout({variables: {refreshToken}});
        await deleteTokenValue();
        onSuccess && onSuccess();
      } catch (err) {
        await deleteTokenValue();
        onError && onError();
      }
    },
    loading
  };
};

export default useLogout;
