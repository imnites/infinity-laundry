import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Sequelize } from 'sequelize';
import { Context } from './types';
import { initModels } from './models';
import { initServiceClients } from './services';
import schema from './federated-schema';
import { buildASTSchema, printSchema } from 'graphql';
import fs from 'fs';
import { initConnection } from './init-connection';
import { KeycloakPublicClient } from './keycloak-public-client';
import { KeycloakClient } from './keycloak-client';

const connectDatabase = async (): Promise<Sequelize> => {
  const sequelize = initConnection();

  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

  return sequelize;
};

if (process.env.NODE_ENV === 'development') {
  fs.writeFileSync(
    './schema.graphql',
    printSchema(buildASTSchema(schema.typeDefs))
  );
}

const server = new ApolloServer<Context>(schema);

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }): Promise<Context> => {
    const sequelize = await connectDatabase();
    const models = await initModels(sequelize);
    const serviceClients = initServiceClients({ sequelize, models });

    const { authorization } = req.headers;

    const keyCloakPublicClient = new KeycloakPublicClient(authorization);
    const keyCloakClient = new KeycloakClient();

    return {
      database: { sequelize, models },
      serviceClients,
      keyCloakPublicClient,
      keycloakClient: keyCloakClient
    };
  }
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch(() => {
    console.log('Error');
  });
