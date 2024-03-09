const typeDefs = `
  extend type Mutation {
    createUser(input: UserInput!): UserReference!
    authenticate(credential: Credential!): AuthResult!
    refreshToken(refreshToken: RefreshTokenInput!): AuthResult!
  }

  input RefreshTokenInput {
    token: String!
  }

  input Credential {
    userName: String!
    password: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String
    userName: String!
    enabled: Boolean!
  }

  type AuthResult {
    accessToken: String!
    expiresInMS: Int!
    refreshToken: String!
    refreshExpiresInMS: Int!
    tokenType: String!
  }

  type UserReference {
    id: String!
    name: String!
  }
`;

export default typeDefs;
