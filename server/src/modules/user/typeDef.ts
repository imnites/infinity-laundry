const typeDefs = `
  extend type Mutation {
    createUserDraft(input: UserInput!): String!
    saveUserDraft(draftId: String!): Boolean!
    authenticate(credential: Credential!): AuthResult!
    refreshToken(refreshToken: String!): AuthResult!
    logout(refreshToken: String): Boolean!
    generatePhoneOTP(phoneNumber: PhoneNumberInput!): OTPResult!
    validatePhoneOTP(phoneNumber: PhoneNumberInput!, apiId: String!, otp: String!): Boolean!
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
    phoneNumber: PhoneNumberInput!
    enabled: Boolean!
  }

  input PhoneNumberInput {
    countryCode: String!
    phoneNumber: String!
  }

  type OTPResult {
    apiId: String!
    success: Boolean!
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
