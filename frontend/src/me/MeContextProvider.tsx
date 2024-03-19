import React, {ReactElement, useState} from 'react';
import {MeContext} from './MeContext';
import {useMe} from './useMe';
import {useRefreshToken} from './useRefreshToken';
import {LoadingScreen} from '~/components/common';
import {Me} from './types';

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
    onCompleted: ({me: user}) => {
      setMe(user);
      setIsLoading(false);
    },
    onError: async () => {
      const user = await refreshToken();
      setMe(user);
      setIsLoading(false);
    }
  });

  return (
    <MeContext.Provider value={{me, setMe}}>
      {isLoading ? <LoadingScreen /> : children}
    </MeContext.Provider>
  );
};
