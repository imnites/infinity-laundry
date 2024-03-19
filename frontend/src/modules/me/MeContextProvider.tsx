import React, {ReactElement, useState} from 'react';
import {MeContext} from './MeContext';
import {Me, useMe} from './useMe';
import {useRefreshToken} from '../common/hooks/useRefreshToken';
import {LoadingScreen} from '~/modules/common/components';

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
      {isLoading ? <LoadingScreen /> : children}
    </MeContext.Provider>
  );
};
