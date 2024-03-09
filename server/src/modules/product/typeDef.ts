const typeDefs = `
  extend type Query {
    products: [ProductReference!]!
  }

  extend type Mutation {
    putProduct(id: String, product: ProductInput): ProductReference!
  }

  input ProductInput {
    name: String
  }

  type ProductReference {
    id: String!
    name: String!
  }
`;

export default typeDefs;
