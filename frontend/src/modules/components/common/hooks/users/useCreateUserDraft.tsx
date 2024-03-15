import {gql, useMutation} from '@apollo/client';

const CREATE_USER_DRAFT = gql`
  mutation createUserDraft($input: UserInput!) {
    createUserDraft(input: $input)
  }
`;

const useCreateUserDraft = () => {
  const [createUserDraft, {loading}] = useMutation(CREATE_USER_DRAFT);

  return {
    createUserDraft: async (input: any) => {
      try {
        const {data} = await createUserDraft({variables: input});
        return data.createUserDraft;
      } catch (err) {
        console.error('Error creating user draft:', err);
      }
    },
    loading,
  };
};

export default useCreateUserDraft;
