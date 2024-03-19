import React, {createContext, useContext} from 'react';
import {Me} from './useMe';

interface MeContextProps {
  me?: Me;
  setMe?: React.Dispatch<React.SetStateAction<Me | undefined>>;
}

export const MeContext = createContext<MeContextProps>({});

export const useMeContext = () => useContext(MeContext);
