import { Sequelize } from 'sequelize';
import pg from 'pg';
import { connectionString } from './config';
import { schema } from './config';

export const initConnection = (): Sequelize => {
  return new Sequelize(connectionString, {
    dialectModule: pg as object,
    schema
  });
};
