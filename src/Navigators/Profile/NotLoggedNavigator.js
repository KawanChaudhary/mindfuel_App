import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginScreen from '../../Screens/Profile/LoginScreen';
import SignUpScreen from '../../Screens/Profile/SignUpScreen';
import {StyleSheet, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import ForgotPasswordScreen from '../../Screens/Profile/ForgotPasswordScreen';

const Stack = createStackNavigator();

const NotLoggedNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name="login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="signup"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="forgotpassword"
          component={ForgotPasswordScreen}
        />
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
