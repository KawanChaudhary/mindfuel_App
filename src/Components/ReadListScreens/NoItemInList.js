import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NoItemInList = ({ theme, navigation }) => {


    return (
        <View style={styles.container}>
        <Text style={[styles.upperText, { color: theme.colors.text }]}>You haven't added any stories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeNavigator')}>
            <Text style={[styles.lowerText, { color: theme.colors.secondary }]}>Get Started</Text>
        </TouchableOpacity>
    </View>
    );
};

export default NoItemInList;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        gap: 10,
    },
    upperText: {
        fontSize: 16,
        fontFamily: 'Comfortaa Bold',
    },
    lowerText: {
        fontSize: 16,
        fontFamily: 'Comfortaa Bold',
    },
});
