import {gql} from '@apollo/client';

export const ME_FRAGMENT = gql`
  fragment MeFragment on Me {
    id
    email
    phoneNumber {
      countryCode
      phoneNumber
    }
    lastName
    firstName
    balance {
      amount
      currency {
        code
        symbol
      }
    }
  }
`;
