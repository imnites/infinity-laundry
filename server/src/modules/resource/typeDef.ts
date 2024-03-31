const typeDefs = `
  extend type Mutation {
    useResource(code: String!): UseResourceResult
  }

  extend type Query {
    resourceDetails(code: String!): Resource!
  }

  type UseResourceResult {
    transactionId: String!
    status: String!
  }

  type Resource {
    id: String!
    code: String!
    name: String!
    type: String!
    maxCapacity: String
    amountPerUse: Money!
  }
`;

export default typeDefs;
