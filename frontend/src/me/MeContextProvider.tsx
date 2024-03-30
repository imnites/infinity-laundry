import React, {ReactElement, useState} from 'react';
import {MeContext} from './MeContext';
import {useMe} from './useMe';
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

  useMe({
    onCompleted: ({me: user}) => {
      setMe(user);
      setIsLoading(false);
    },
    onError: async () => {
      setMe(undefined);
      setIsLoading(false);
    }
  });

  return (
    <MeContext.Provider value={{me, setMe}}>
      {isLoading ? <LoadingScreen /> : children}
    </MeContext.Provider>
  );
};
