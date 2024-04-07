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

  const sortedPageOfTransactions = data?.pageOfTransactions
    ? [...data.pageOfTransactions].sort((transaction1, transaction2) => {
        const date1 = new Date(transaction1.transactionCompletionTime);
        const date2 = new Date(transaction2.transactionCompletionTime);
        return date2.getTime() - date1.getTime();
      })
    : [];

  return {
    pageOfTransactions: sortedPageOfTransactions,
    loading
  };
};
