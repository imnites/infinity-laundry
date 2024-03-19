import {gql, useMutation} from '@apollo/client';

const SAVE_USER_DRAFT = gql`
  mutation saveUserDraft($draftId: String!) {
    saveUserDraft(draftId: $draftId)
  }
`;

const useSaveUserDraft = () => {
  const [saveUserDraft, {loading}] = useMutation(SAVE_USER_DRAFT);

  return {
    saveUserDraft: async (input: any, headers: any) => {
      try {
        const {data} = await saveUserDraft({
          variables: input,
          context: {headers}
        });
        return data.saveUserDraft;
      } catch (err) {
        console.error('Error creating user:', err);
      }
    },
    loading
  };
};

export default useSaveUserDraft;
