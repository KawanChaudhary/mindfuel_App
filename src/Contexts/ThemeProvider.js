// ThemeProvider.js
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../Data/theme';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  const getUserTheme = useCallback(async () => {
    return await AsyncStorage.getItem('theme');
  }, []);

  const setUserTheme = async (userTheme) => {
    await AsyncStorage.setItem('theme', userTheme);
    await themeVal();
  };

  const themeVal = useCallback(async () => {
    const themeValue = await getUserTheme();

    if (themeValue === 'system') {
      await setThemeValue(systemTheme);
    }
    else {
      await setThemeValue(themeValue);
    }
  }, [getUserTheme, systemTheme]);

  const setThemeValue = async (themeName) => {
    if (themeName === 'dark') {
      setCurrentTheme(darkTheme);
    }
    else {
      setCurrentTheme(lightTheme);
    }
  };

  useEffect(() => {

    themeVal();
  }, [systemTheme, themeVal]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, getUserTheme, setUserTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
