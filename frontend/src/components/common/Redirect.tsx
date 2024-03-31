import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface RedirectPropsType {
  to: string;
  navProps?: {
    [key: string]: any;
  };
}

export const Redirect: React.FC<RedirectPropsType> = ({to, navProps}) => {
  const nav = useNavigation();
  useEffect(() => {
    (nav.navigate as any)(to, navProps);
  }, [nav.navigate, navProps, to]);

  return <View />;
};

export default Redirect;
