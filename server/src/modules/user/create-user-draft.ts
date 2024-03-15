import { Context } from '~/types';
import { MutationCreateUserDraftArgs } from '~/generated-types';

export const createUserDraft = async (
  parent: { [key: string]: unknown } | null,
  args: MutationCreateUserDraftArgs,
  context: Context
): Promise<string> => {
  const id = crypto.randomUUID();
  await context.redisClient.saveData(id, { ...args.input, id });

  return id;
};
