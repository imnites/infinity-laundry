import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface TitlePropsType {
  title: string;
}

const Title: React.FC<TitlePropsType> = ({title}) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

export default Title;
