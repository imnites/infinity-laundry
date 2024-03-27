import {
  userTypeDefs,
  userResolvers,
  orderTypeDefs,
  orderResolvers,
  paymentTypeDefs,
  paymentResolvers
} from './modules';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const root = `
type Query {
  _: String
}

type Mutation {
  _: String
}

type Subscription {
  _: String
}
`;

export default {
  typeDefs: mergeTypeDefs([root, userTypeDefs, orderTypeDefs, paymentTypeDefs]),
  resolvers: mergeResolvers([userResolvers, orderResolvers, paymentResolvers])
};
