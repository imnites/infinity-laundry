import {
  userTypeDefs,
  userResolvers,
  orderTypeDefs,
  orderResolvers,
  resourceTypeDefs,
  resourceResolvers,
  templateTypeDefs,
  templateResolvers
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
    resourceTypeDefs,
    templateTypeDefs
  ]),
  resolvers: mergeResolvers([
    userResolvers,
    orderResolvers,
    resourceResolvers,
    templateResolvers
  ])
};
