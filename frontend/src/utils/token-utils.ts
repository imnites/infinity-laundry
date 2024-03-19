import {NativeModules} from 'react-native';

const {SecureStorageModule} = NativeModules;

export const setTokenValue = async ({
  accessToken,
  refreshToken,
  tokenType
}: {
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
}): Promise<void> => {
  await SecureStorageModule.setValue('access-token', accessToken);

  if (refreshToken) {
    await SecureStorageModule.setValue('refresh-token', refreshToken);
  }

  await SecureStorageModule.setValue('token-type', tokenType);
};

export const getTokenValue = async (): Promise<{
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}> => {
  const accessToken = await SecureStorageModule.getValue('access-token');
  const refreshToken = await SecureStorageModule.getValue('refresh-token');
  const tokenType = await SecureStorageModule.getValue('token-type');

  return {
    accessToken,
    refreshToken,
    tokenType
  };
};

export const deleteTokenValue = async (): Promise<void> => {
  await SecureStorageModule.deleteValue('access-token');
  await SecureStorageModule.deleteValue('refresh-token');
  await SecureStorageModule.deleteValue('token-type');
};
