import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = ({children, loading}) => {
  const pathFile = require('../../../assets/loader/loader.json');

  if (!loading) {
    return <View style={styles.loader}>{children}</View>;
  }

  return (
    <LottieView source={pathFile} autoPlay loop style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scale: 0.5}]
  },
  loader: {
    flex: 1,
  },
});

export default Loader;
