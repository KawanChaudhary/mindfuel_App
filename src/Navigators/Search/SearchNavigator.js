import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SearchScreen from '../../Screens/Search/SearchScreen';
import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

const SearchNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name="search"
          component={SearchScreen}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </View>
  );
};

export default SearchNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
