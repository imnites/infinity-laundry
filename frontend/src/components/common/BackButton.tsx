import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface BackButtonPropsType {
  color?: string;
  size: number;
  handleBackPress: any;
}

const BackButton = ({color, size, handleBackPress}: BackButtonPropsType) => {
  return (
    <Icon
      name="arrow-back"
      color={color}
      size={size}
      onPress={handleBackPress}
    />
  );
};

export default BackButton;
