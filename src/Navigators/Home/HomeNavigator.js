import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../../Screens/Home/HomeScreen';
import DetailStoryScreen from '../../Screens/Other/DetailStoryScreen';
import {StyleSheet, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import NotificationsScreen from '../../Screens/Home/NotificationsScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="DetailStory"
          component={DetailStoryScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="notifications"
          component={NotificationsScreen}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </View>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
