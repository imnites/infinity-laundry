import {
  userTypeDefs,
  userResolvers,
  orderTypeDefs,
  orderResolvers,
  transactionTypeDefs,
  transactionResolvers,
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
    transactionTypeDefs,
    templateTypeDefs
  ]),
  resolvers: mergeResolvers([
    userResolvers,
    orderResolvers,
    transactionResolvers,
    templateResolvers
  ])
};
