import React, {ReactElement, useState, useCallback} from 'react';
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

  const {refetch} = useMe({
    onCompleted: ({me: user}) => {
      setMe(user);
      setIsLoading(false);
    },
    onError: async () => {
      setMe(undefined);
      setIsLoading(false);
    }
  });

  const refresh = useCallback(
    () =>
      refetch().then(({data}) => {
        setMe(data.me);
      }),
    [refetch]
  );

  return (
    <MeContext.Provider value={{me, setMe, refresh}}>
      {isLoading ? <LoadingScreen /> : children}
    </MeContext.Provider>
  );
};
