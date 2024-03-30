const typeDefs = `
  extend type Mutation {
    addTransaction(input: AddTransactionInput!): String!
  }

  extend type Query {
    transactionDetails(input: TransactionDetailsInput!): [TransactionDetails!]
  }

  input AddTransactionInput {
    userId: String!
    type: String!
    machineId: String
    machineNumber: String
    amount: Float!
    currencyId: String!
    timestamp: String!
    completed: Boolean!
  }

  input TransactionDetailsInput {
    userId: String!
  }

  type TransactionDetails {
    id: String!
    userId: String!
    type: String!
    machineDetails: MachineDetails
    amount: Money
    timestamp: String!
    completed: Boolean!
  }

  type MachineDetails {
    machineId: String!
    machineNumber: String!
  }
`;

export default typeDefs;
