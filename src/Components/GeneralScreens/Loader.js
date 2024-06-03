import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = () => {

    const pathFile = require('../../../assets/loader/loader.json');

  return (
      <LottieView
        source={pathFile}
        autoPlay
        loop
        style={styles.container}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
