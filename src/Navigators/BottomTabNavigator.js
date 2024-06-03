import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ThemeContext } from '../Contexts/ThemeProvider';
import HomeNavigator from './Home/HomeNavigator';
import ProfileNavigator from './Profile/ProfileNavigator';
import ReadListNavigator from './ReadList/ReadListNavigator';
import SearchNavigator from './Search/SearchNavigator';

const Tab = createBottomTabNavigator();

const tabs = [
  {
    title: 'Home',
    name: 'HomeNavigator',
    screen: HomeNavigator,
    activeIcon: 'home',
    inactiveIcon: 'home-outline',
  },
  {
    title: 'Search',
    name: 'SearchNavigator',
    screen: SearchNavigator,
    activeIcon: 'search',
    inactiveIcon: 'search-outline',
  },
  {
    title: 'Read List',
    name: 'ReadListNavigator',
    screen: ReadListNavigator,
    activeIcon: 'bookmarks',
    inactiveIcon: 'bookmarks-outline',
  },
  {
    title: 'Profile',
    name: 'ProfileNavigator',
    screen: ProfileNavigator,
    activeIcon: 'user',
    inactiveIcon: 'user-o',
  },
];

const BottomTabNavigator = () => {

  const { theme } = useContext(ThemeContext);

  const renderTabIcon = ({ tab, focused }) => {

    let iconName;
    if (tab.name === 'ProfileNavigator') {
      iconName = focused ? tab.activeIcon : tab.inactiveIcon;
      return <FontAwesome name={iconName} color={theme.colors.text} size={25} />;
    }
    else {
      switch (tab.name) {
        case 'HomeNavigator':
          iconName = focused ? tab.activeIcon : tab.inactiveIcon;
          break;
        case 'SearchNavigator':
          iconName = focused ? tab.activeIcon : tab.inactiveIcon;
          break;
        case 'ReadListNavigator':
          iconName = focused ? tab.activeIcon : tab.inactiveIcon;
          break;
      }
      return <Ionicons name={iconName} color={theme.colors.text} size={theme.fontSize} />;
    }

  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: theme.colors.background, borderTopWidth: 1,
          borderTopColor: theme.colors.backgroundLight},
      }}>
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.screen}
          options={{
            tabBarIcon: ({ focused }) => renderTabIcon({ tab, focused }),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
