import {gql, useQuery} from '@apollo/client';

export const PAGE_OF_TRANSACTIONS = gql`
  query ($filter: TransactionsFilter) {
    pageOfTransactions(filter: $filter) {
      id
      amount {
        amount
        currency {
          id
          code
          symbol
        }
      }
      type
      status
      transactionTime
      transactionCompletionTime
      resource {
        id
        name
        code
      }
    }
  }
`;

export const usePageOfTransactions = ({
  dateRange,
  statuses
}: {
  dateRange: {startDate: string; endDate: string};
  statuses: string[];
}) => {
  const {data, loading} = useQuery(PAGE_OF_TRANSACTIONS, {
    variables: {
      filter: {
        dateRange: dateRange,
        statuses: statuses
      }
    }
  });

  return {
    pageOfTransactions: data?.pageOfTransactions,
    loading
  };
};
