const typeDefs = `
  extend type Mutation {
    createUser(input: UserInput!): Boolean!
    authenticate(credential: Credential!): AuthResult!
    refreshToken(refreshToken: String!): AuthResult!
    logout(refreshToken: String): Boolean!
  }

  extend type Query {
    me: Me!
  }

  input Credential {
    userName: String!
    password: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    enabled: Boolean!
    phoneNumber: PhoneNumberInput!
  }

  input PhoneNumberInput {
    countryCode: String!
    phoneNumber: String!
  }

  type PhoneNumber {
    countryCode: String!
    phoneNumber: String!
  }

  type AuthResult {
    accessToken: String!
    expiresInSec: Int!
    refreshToken: String!
    refreshExpiresInSec: Int!
    tokenType: String!
  }

  type Me {
    id: String!
    name: String!
    firstName: String!
    lastName: String!
    email: String!
    enabled: Boolean!
    phoneNumber: PhoneNumber
  }
`;

export default typeDefs;
