import React, { createContext, useEffect, useState, useCallback } from 'react';
import { lightTheme, darkTheme } from '../Data/theme';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(systemTheme === 'dark' ? darkTheme : lightTheme);
  const [userPreference, setUserPreference] = useState(null);

  const updateTheme = useCallback((themeName) => {
    if (themeName === 'dark') {
      setCurrentTheme(darkTheme);
    } else if (themeName === 'light') {
      setCurrentTheme(lightTheme);
    } else {
      setCurrentTheme(systemTheme === 'dark' ? darkTheme : lightTheme);
    }
  }, [systemTheme]);

  const loadUserTheme = useCallback(async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      setUserPreference(savedTheme);
      updateTheme(savedTheme);
    } catch (error) {
      console.error('Error loading user theme:', error);
    }
  }, [updateTheme]);

  const setUserTheme = async (themeName) => {
    try {
      await AsyncStorage.setItem('theme', themeName);
      setUserPreference(themeName);
      updateTheme(themeName);
    } catch (error) {
      console.error('Error saving user theme:', error);
    }
  };

  useEffect(() => {
    loadUserTheme();
  }, [loadUserTheme]);

  useEffect(() => {
    if (userPreference === 'system' || !userPreference) {
      updateTheme('system');
    }
  }, [systemTheme, userPreference, updateTheme]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme: () => setUserTheme(currentTheme === lightTheme ? 'dark' : 'light'), setUserTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
