import {
  productTypeDefs,
  productResolvers,
  userTypeDefs,
  userResolvers
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
  typeDefs: mergeTypeDefs([root, productTypeDefs, userTypeDefs]),
  resolvers: mergeResolvers([productResolvers, userResolvers])
};
