import { View } from 'react-native';
import React from 'react';

export default function Column(props) {
  const { style, ...rest } = props;
  return <View style={[style]} {...rest} />;
}
