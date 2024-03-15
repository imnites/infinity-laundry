import { Context } from '~/types';
import { MutationCreateUserDraftArgs } from '~/generated-types';
import { UUIDV4 } from 'sequelize';

export const createUserDraft = async (
  parent: { [key: string]: unknown } | null,
  args: MutationCreateUserDraftArgs,
  context: Context
): Promise<string> => {
  const { key: id } = UUIDV4();
  await context.redisClient.saveData(id, args.input);

  return id;
};
