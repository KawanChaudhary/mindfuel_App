import { StyleSheet, View, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import HomeListSkeleton from './StoryCard/HomeListSkeleton';
import { ThemeContext } from '../../Contexts/ThemeProvider';

const AllStory = () => {

    const { theme } = useContext(ThemeContext);

    const [stories, setStories] = useState([
        { _id: '1', title: 'Item 1' },
        { _id: '2', title: 'Item 2' },
        { _id: '3', title: 'Item 3' },
        { _id: '4', title: 'Item 4' },
        { _id: '5', title: 'Item 4' },
        { _id: '6', title: 'Item 4' },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStories = async () => {
            try {

                const { data } = await axiosInstance.get('/story/getAllStories');
                setStories(data.data);
                setLoading(false);
            }
            catch (error) {
                setLoading(true);
            }
        };
        getStories();
    }, [setLoading, stories]);

    const renderStory = ({ item }) => (
        <HomeListSkeleton loading={loading} story={item} theme={theme} />
    );

    return (
        <View style={[styles.container]}>
            <FlatList
                data={stories}
                renderItem={renderStory}
                keyExtractor={(item) => item._id}
            />

        </View>
    );
};

export default AllStory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
