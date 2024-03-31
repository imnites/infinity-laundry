import {gql, useMutation} from '@apollo/client';
import {useCallback} from 'react';

const USE_RESOURCE = gql`
  mutation useResource($code: String!) {
    useResource(code: $code) {
      transactionId
      status
    }
  }
`;

const useUseResource = () => {
  const [_useResource] = useMutation(USE_RESOURCE);

  return useCallback(
    async (code: string) => {
      const {data} = await _useResource({
        variables: {code}
      });

      return data.useResource;
    },
    [_useResource]
  );
};

export default useUseResource;
