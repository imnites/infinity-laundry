const typeDefs = `
  extend type Mutation {
    addPayment(input: AddPaymentInput!): String!
  }

  extend type Query {
    paymentDetails(input: PaymentDetailsInput!): [PaymentDetails!]
  }

  input AddPaymentInput {
    userId: String!
    type: String!
    machineId: String
    machineNumber: String
    amount: Float!
    currencyId: String!
    timestamp: String!
    completed: Boolean!
  }

  input PaymentDetailsInput {
    userId: String!
  }

  type PaymentDetails {
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
