const typeDefs = `
  extend type Mutation {
    createCashfreeOrder(userId: String!, amount: AmountInput!): CashfreeOrderResult!
    verifyAndCompleteCashfreeOrder(userId: String!, orderId: String!): Boolean!
  }

  extend type Query {
    pageOfTransactions(filter: TransactionsFilter): [Transaction!]!
  }

  input TransactionsFilter {
    dateRange: DateRangeInput
    status: String
  }

  input DateRangeInput {
    startDate: String!
    endDate: String!
  }

  input AmountInput {
    amount: Float!
    currencyCode: String!
  }

  type CashfreeOrderResult {
    orderId: String!
    cfPaymentId: String!
    paymentSessionId: String!
  }

  type Transaction {
    id: String!
  }
`;

export default typeDefs;
