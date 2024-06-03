import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import ThemeProvider from '../Contexts/ThemeProvider';
import AuthContextProvider from '../Contexts/AuthContext';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <ThemeProvider>
          <BottomTabNavigator />
        </ThemeProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
