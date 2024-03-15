import {gql, useMutation} from '@apollo/client';

const UPDATE_PASSWORD = gql`
  mutation updatePassword($password: String!) {
    updatePassword(password: $password)
  }
`;

const useUpdatePassword = () => {
  const [updatePassword, {loading}] = useMutation(UPDATE_PASSWORD);

  return {
    updatePassword: async (input: any) => {
      try {
        const {data} = await updatePassword({variables: input});
        return data.updatePassword;
      } catch (err) {
        console.error('Error generating updating password:', err);
      }
    },
    loading,
  };
};

export default useUpdatePassword;
