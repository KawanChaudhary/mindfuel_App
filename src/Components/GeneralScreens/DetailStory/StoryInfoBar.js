import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { editDate } from '../../../Data/commonFunctions';

const StoryInfoBar = ({ theme, createdAt, readTime, iconSize }) => {

    return (
        <View style={styles.storyInfo}>
            <View style={styles.dateAndRead}>
                <MaterialCommunityIcons name="calendar-month" color={theme.colors.text} size={iconSize} />
                <Text style={[styles.rightText, { color: theme.colors.text }]}>{editDate(createdAt, false)}</Text>
            </View>
            <View style={styles.dateAndRead}>
                <MaterialCommunityIcons name="clock-time-four-outline" color={theme.colors.text} size={iconSize} />
                <Text style={[styles.rightText, { color: theme.colors.text }]}>{readTime} min read</Text>
            </View>
        </View>
    );
};

export default StoryInfoBar;

const styles = StyleSheet.create({
    storyInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15,
    },
    dateAndRead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    rightText: {
        fontSize: 13,
        fontFamily: 'Comfortaa Regular',
    },
});
