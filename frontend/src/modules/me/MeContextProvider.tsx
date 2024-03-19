import React, {ReactElement, useState} from 'react';
import {Text, View} from 'react-native';
import {MeContext} from './MeContext';
import {Me, useMe} from './useMe';
import {useRefreshToken} from '../common/hooks/useRefreshToken';

interface MeContextProviderProps {
  children: ReactElement;
}

export const MeContextProvider: React.FC<MeContextProviderProps> = ({
  children
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [me, setMe] = useState<Me>();
  const {refreshToken} = useRefreshToken();

  useMe({
    onCompleted: user => {
      setIsLoading(false);
      setMe(user);
    },
    onError: async () => {
      const user = await refreshToken();
      setIsLoading(false);
      setMe(user);
    }
  });

  return (
    <MeContext.Provider value={{me, setMe}}>
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
