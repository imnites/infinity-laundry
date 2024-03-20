import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import {Me} from './types';

export const ME = gql`
  query me {
    me {
      id
      email
      phoneNumber {
        countryCode
        phoneNumber
      }
      lastName
      firstName
      balance {
        amount
        currency {
          code
          symbol
        }
      }
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
    me: data?.me as Me,
    loading
  };
};
