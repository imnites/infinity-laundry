import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const DrawerToggleButton = ({onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="menu" size={35} color="black" style={{marginLeft: 10}} />
    </TouchableOpacity>
  );
};

export default DrawerToggleButton;
