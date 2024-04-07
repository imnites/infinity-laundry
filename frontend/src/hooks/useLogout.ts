import {gql, useMutation} from '@apollo/client';
import {deleteTokenValue, getTokenValue} from '~/utils';
import {useMeContext} from '~/me';

const LOGOUT = gql`
  mutation logout($refreshToken: String) {
    logout(refreshToken: $refreshToken)
  }
`;

const useLogout = () => {
  const {setMe} = useMeContext();
  const [logout, {loading}] = useMutation(LOGOUT);

  return {
    logout: async (onSuccess?: () => void, onError?: () => void) => {
      const {refreshToken} = await getTokenValue();
      try {
        await logout({variables: {refreshToken}});

        await deleteTokenValue();
        setMe && setMe(undefined);
        onSuccess && onSuccess();
      } catch (err) {
        await deleteTokenValue();
        setMe && setMe(undefined);
        onError && onError();
      }
    },
    loading
  };
};

export default useLogout;
