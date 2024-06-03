import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Interaction = ({ likeStatus, likes, comments, bookmarked, onPressLike, onPressComment, onPressBookmark, theme }) => {
    const { width } = useWindowDimensions();
    const containerToMove = ((width - 180) / 2);


    return (
        <View style={[styles.container, { left: containerToMove, backgroundColor: theme.colors.backgroundLight }]}>
            <TouchableOpacity style={styles.iconContainer} onPress={onPressLike}>
                <FontAwesome name={likeStatus ? 'heart' : 'heart-o'} size={24} color={theme.colors.text} />
                <Text style={[styles.text, { color: theme.colors.text }]}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.iconContainer} onPress={onPressComment}>
                <Feather name="message-circle" size={24} color={theme.colors.text} />
                <Text style={[styles.text, { color: theme.colors.text }]}>{comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={onPressBookmark}>
                <FontAwesome name={bookmarked ? 'bookmark' : 'bookmark-o'} size={24} color={theme.colors.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: 180,
        gap: 15,
        borderRadius: 20,
        zIndex: 100,
        opacity: 0.9,
        elevation:5,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    text: {
        fontSize: 16,
        fontFamily: 'Comfortaa Semibold',
    },
});


export default Interaction;
