const typeDefs = `
  extend type Mutation {
    createUserDraft(input: UserInput!): String!
    saveUserDraft(draftId: String!): Boolean!
    authenticate(credential: Credential!): AuthResult!
    refreshToken(refreshToken: String!): AuthResult!
    logout(refreshToken: String): Boolean!
    generatePhoneOTP(otpInput: OTPInput!): OTPResult!
    validatePhoneOTP(verificationToken: String!, otp: String!): OTPValidationResult!
    updatePassword(password: String!): Boolean!
  }

  extend type Query {
    me: Me!
  }

  input Credential {
    userName: String
    phoneNumber: PhoneNumberInput
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

  input OTPInput {
    id: String
    email: String
    phoneNumber: PhoneNumberInput
  }

  type OTPResult {
    success: Boolean!
    verificationToken: String
    phoneNumber: PhoneNumber!
  }

  type OTPValidationResult {
    userId: String
    phoneNumber: PhoneNumber
    verified: Boolean
    accessToken: String
    expiresInSec: Int!
    tokenType: String!
  }

  type PhoneNumber {
    countryCode: String!
    phoneNumber: String!
  }

  type AuthResult {
    accessToken: String!
    expiresInSec: Int!
    refreshToken: String
    refreshExpiresInSec: Int
    tokenType: String!
    me: Me!
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
