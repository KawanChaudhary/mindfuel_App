import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Screens/Profile/LoginScreen';
import SignUpScreen from '../../Screens/Profile/SignUpScreen';
import { StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

const NotLoggedNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="signup" component={SignUpScreen} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </View>
  );
};

export default NotLoggedNavigator;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
