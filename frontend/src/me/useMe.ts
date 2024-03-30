import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import {Me} from './types';
import {ME_FRAGMENT} from './me.fragment';

export const ME = gql`
  ${ME_FRAGMENT}
  query me {
    me {
      ...MeFragment
    }
  }
`;

export const useMe = ({
  onError,
  onCompleted
}: {
  onError?: () => void;
  onCompleted?: ({me}: {me: Me}) => void;
}) => {
  const {data, loading} = useQuery(ME, {
    variables: {},
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onError: onError,
    onCompleted: onCompleted
  });

  return {
    me: data?.me as Me | undefined,
    loading
  };
};
