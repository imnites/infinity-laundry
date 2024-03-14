import {gql, useMutation} from '@apollo/client';

const PUT_USER = gql`
  mutation putUser($input: UserInput!) {
    createUser(input: $input)
  }
`;

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  enabled: string;
  phoneNumber: PhoneNumberType;
}

interface PhoneNumberType {
  countryCode: any;
  phoneNumber: string;
}

const usePutUser = () => {
  const [putUser, {loading}] = useMutation(PUT_USER);

  return {
    putUser: async (user: UserType) => {
      try {
        const {data} = await putUser({
          variables: {input: user},
        });

        return data;
      } catch (err) {
        return {error: true};
      }
    },
    loading,
  };
};

export default usePutUser;
