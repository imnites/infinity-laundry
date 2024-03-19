import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface TabIconPropsType {
  name: string;
  color: any;
  size: number;
}

const TabIcon = ({name, color, size}: TabIconPropsType) => {
  return (
    <View>
      <Icon name={name} color={color} size={size} />
    </View>
  );
};

export default TabIcon;
