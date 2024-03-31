import {
  userTypeDefs,
  userResolvers,
  orderTypeDefs,
  orderResolvers,
  resourceTypeDefs,
  resourceResolvers
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
  typeDefs: mergeTypeDefs([
    root,
    userTypeDefs,
    orderTypeDefs,
    resourceTypeDefs
  ]),
  resolvers: mergeResolvers([userResolvers, orderResolvers, resourceResolvers])
};
