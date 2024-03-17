import React, {ReactElement, createContext, useContext, useState} from 'react';
import {NativeModules, Text, View} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {gql} from '@apollo/client';

const {SecureStorageModule} = NativeModules;

interface MeContextProps {
  user: {[key: string]: unknown} | null;
  setUser?: React.Dispatch<React.SetStateAction<null>>;
}

export const MeContext = createContext<MeContextProps>({
  user: null,
});

export const useMeContext = () => useContext(MeContext);

const ME = gql`
  query me {
    me {
      id
      email
      email
      phoneNumber {
        countryCode
        phoneNumber
      }
      lastName
      firstName
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      tokenType
      me {
        id
        email
        email
        phoneNumber {
          countryCode
          phoneNumber
        }
        lastName
        firstName
      }
    }
  }
`;

interface MeContextProviderProps {
  children: ReactElement;
}

export const MeContextProvider: React.FC<MeContextProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [refreshToken] = useMutation(REFRESH_TOKEN);

  useQuery(ME, {
    variables: {},
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onError: async () => {
      const refreshTokenVal = await SecureStorageModule.getValue(
        'refresh-token',
      );

      if (!refreshTokenVal) {
        setIsLoading(false);
        return;
      }

      try {
        const {data} = await refreshToken({
          variables: {
            refreshToken: refreshTokenVal,
          },
        });

        if (data && data.refreshToken) {
          SecureStorageModule.setValue(
            'access-token',
            data.refreshToken.accessToken,
          );
          SecureStorageModule.setValue(
            'refresh-token',
            data.refreshToken.refreshToken,
          );
          SecureStorageModule.setValue(
            'token-type',
            data.refreshToken.tokenType,
          );

          setIsLoading(false);
          setUser(data.refreshToken.me);
        } else {
          setIsLoading(false);
        }
      } catch (ex) {
        setIsLoading(false);
      }
    },
    onCompleted: ({me}) => {
      setIsLoading(false);
      setUser(me);
    },
  });

  return (
    <MeContext.Provider value={{user, setUser}}>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        children
      )}
    </MeContext.Provider>
  );
};
