import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeProvider';
import Header from '../../Components/GeneralScreens/Header';

const NotificationsScreen = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header title={'Notifications'} showBackButton={true} />

            <View style={styles.notificationContainer}>
                <Text style={[styles.text, { color: theme.colors.text }]}>There are no notifications for you at the moment</Text>
            </View>

        </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notificationContainer: {
        alignItems: 'center',
        marginVertical: 35,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Comfortaa SemiBold',
    },
});
