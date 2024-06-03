import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../Screens/Profile/ProfileScreen';
import EditProfileScreen from '../../Screens/Profile/EditProfileScreen';
import ChangePasswordScreen from '../../Screens/Profile/ChangePasswordScreen';
import { StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import SettingScreen from '../../Screens/Profile/SettingScreen';

const Stack = createStackNavigator();

const LoggedUserNavigator = () => {
    return (
        <View style={styles.container}>

            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="profile" component={ProfileScreen} />
                <Stack.Screen options={{ headerShown: false }} name="editprofile" component={EditProfileScreen} />
                <Stack.Screen options={{ headerShown: false }} name="changepassword" component={ChangePasswordScreen} />
                <Stack.Screen options={{ headerShown: false }} name="settings" component={SettingScreen} />
            </Stack.Navigator>
            <FlashMessage position="top" />
        </View>
    );
};

export default LoggedUserNavigator;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
