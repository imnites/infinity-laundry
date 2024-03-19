import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

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
    }
  }
`;

export type Me = {
  id: string;
  email: string;
  phoneNumber: {
    countryCode: string;
    phoneNumber: string;
  };
  lastName: string;
  firstName: string;
};

export const useMe = ({
  onError,
  onCompleted
}: {
  onError?: () => void;
  onCompleted?: (me: Me) => void;
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
