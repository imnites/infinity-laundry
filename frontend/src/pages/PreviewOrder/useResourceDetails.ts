import {gql, useQuery} from '@apollo/client';

const RESOURCE_DETAILS = gql`
  query resourceDetails($code: String!) {
    resourceDetails(code: $code) {
      id
      code
      name
      type
      maxCapacity
      amountPerUse {
        amount
        currency {
          id
          code
          symbol
        }
      }
    }
  }
`;

export const useResourceDetails = ({code}: {code: string}) => {
  const {data, loading} = useQuery(RESOURCE_DETAILS, {
    variables: {
      code
    },
    skip: !code,
    fetchPolicy: 'network-only'
  });

  return {
    loading,
    resourceDetails: data?.resourceDetails
  };
};

export default useResourceDetails;
