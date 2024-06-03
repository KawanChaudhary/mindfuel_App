import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NoUser = ({ theme }) => {

    const pathFile = require('../../../assets/images/searching-data.png');

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={pathFile}
                style={[styles.container, { backgroundColor: theme.colors.background }]}
            />

            <View style={styles.textView}>

                <Text style={[styles.upperText, { color: theme.colors.text }]}>
                    To access the reading list, please login first
                </Text>

                <View style={styles.loginView}>
                    <AntDesign name="caretright" color={theme.colors.secondary} size={24} />

                    <Text style={[styles.goForThe, {color:theme.colors.text}]}>Go for the</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('ProfileNavigator')}>
                        <Text style={[styles.btnText, { color: theme.colors.secondary }]}>login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default NoUser;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textView: {
        gap: 15,
    },
    upperText: {
        fontSize: 22,
        fontFamily: 'RubikBubbles-Regular',
    },
    loginView:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    goForThe:{
        fontSize:16,
        fontFamily:'Comfortaa SemiBold',
        letterSpacing:1,
    },
    btnText: {
        fontSize: 16,
        fontFamily: 'Comfortaa SemiBold',
        letterSpacing: 1,
    },
});
