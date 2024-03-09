import { initModels } from './models';
import { initConnection } from './init-connection';

const logMessage = (modelName?: string): void => {
  console.log(`model "${modelName}" synced successfully.`);
};

export const syncModels = async (): Promise<void> => {
  const sequelize = await initConnection();

  const models = await initModels(sequelize);

  for await (const m of Object.values(models)) {
    await m.sync();

    logMessage(m.tableName);
  }
};

syncModels().catch((err) => {
  console.log(err);
});
