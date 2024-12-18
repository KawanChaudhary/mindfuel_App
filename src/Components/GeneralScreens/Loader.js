import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = ({loading, children}) => {
  const pathFile = require('../../../assets/loader/loader.json');

  return (
    <View style={styles.container}>
      {children}
      {loading && (
        <Modal
          visible={loading}
          transparent={true}
          animationType="fade"
          statusBarTranslucent={true}>
          <View style={styles.overlay}>
            <LottieView
              source={pathFile}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
  },
});
