import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AddStoryModal from '../AddStory/AddStoryModal';

const MyStoriesEmpty = ({ theme, navigation }) => {

    const [addStoryModalVisible, setAddStoryModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={[styles.upperText, { color: theme.colors.text }]}>You haven't published any stories</Text>
            <TouchableOpacity onPress={() => setAddStoryModalVisible(true)}>
                <Text style={[styles.lowerText, { color: theme.colors.secondary }]}>Get Started</Text>
            </TouchableOpacity>
            <AddStoryModal visible={addStoryModalVisible} closeModal={setAddStoryModalVisible} />
        </View>
    );
};

export default MyStoriesEmpty;

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
