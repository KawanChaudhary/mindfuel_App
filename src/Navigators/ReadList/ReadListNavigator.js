import { View, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import FlashMessage from 'react-native-flash-message';
import { createStackNavigator } from '@react-navigation/stack';
import ReadListScreen from '../../Screens/ReadList/ReadListScreen';
import NoUser from '../../Components/ReadListScreens/NoUser';
import { ThemeContext } from '../../Contexts/ThemeProvider';

const Stack = createStackNavigator();

const ReadListNavigator = () => {
  const { theme } = useContext(ThemeContext);

  const { auth } = useContext(AuthContext);

  return (
    <View style={[styles.container, {backgroundColor:theme.colors.background}]}>
      {auth ?
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="readlist" component={ReadListScreen} />
        </Stack.Navigator>
        :

        <NoUser theme={theme} />
      }
      <FlashMessage position="top" />
    </View>
  );
};

export default ReadListNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

