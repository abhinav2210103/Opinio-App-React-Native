import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const AppLoader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Animation2.json')}
        autoPlay
        loop
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:200
  },
  loader: {
    width: 300, 
    height: 300,
  },
});

export default AppLoader;
