import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../Contexts/ThemeProvider';

const HeaderWithIcon = ({ title, iconName, screenName }) => {
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
                <Ionicons name={iconName} size={25} color={theme.colors.text} />
            </TouchableOpacity>
        </View>
    );
};

export default HeaderWithIcon;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 45,
    },
    title: {
        fontSize: 25,
        fontFamily:'Comfortaa Bold',
    },
});
