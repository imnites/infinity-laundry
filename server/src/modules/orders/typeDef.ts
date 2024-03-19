const typeDefs = `
  extend type Mutation {
    createCashfreeOrder(userId: String!, amount: AmountInput!): CashfreeOrderResult!
  }

  extend type Query {
    fetchCashfreeOrder(userId: String!, orderId: String!, cfPaymentId:String!): Boolean!
  }

  input AmountInput {
    amount: Float!
    currencyId: String!
  }

  type CashfreeOrderResult {
    orderId: String!
    cfPaymentId: String!
    paymentSessionId: String!
  }
`;

export default typeDefs;
