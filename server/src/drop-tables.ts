import { initModels } from './models';
import { initConnection } from './init-connection';

const logMessage = (modelName?: string): void => {
  console.log(`model "${modelName}" deleted successfully.`);
};

export const dropTables = async (): Promise<void> => {
  const sequelize = await initConnection();

  const models = await initModels(sequelize);

  for await (const m of Object.values(models).reverse()) {
    await m.drop();

    logMessage(m.tableName);
  }
};

dropTables().catch((err) => {
  console.log(err);
});
