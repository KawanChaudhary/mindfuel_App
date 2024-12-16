import React, {useContext, useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import axiosInstance from '../../axiosInstance';
import HomeListSkeleton from './StoryCard/HomeListSkeleton';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import Loader from '../GeneralScreens/Loader';

const AllStory = () => {
  const {theme} = useContext(ThemeContext);

  const [stories, setStories] = useState([
    {_id: '1', title: 'Item 1'},
    {_id: '2', title: 'Item 2'},
    {_id: '3', title: 'Item 3'},
    {_id: '4', title: 'Item 4'},
    {_id: '5', title: 'Item 4'},
    {_id: '6', title: 'Item 4'},
  ]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchStories = async (pageNum = 1, searchKey = '') => {
    if (!hasMore && pageNum !== 1) {
      return;
    }

    const pageSize = 12; // Fetch 12 stories at a time
    const searchParam = searchKey ? `&search=${searchKey}` : '';

    try {
      const {data} = await axiosInstance.get(
        `/story/getAllStories?page=${pageNum}&limit=${pageSize}${searchParam}`,
      );

      if (pageNum === 1) {
        setStories(data.data);
      } else {
        setStories(prevStories => [...prevStories, ...data.data]);
      }

      setHasMore(data.data.length === pageSize);
    } catch (error) {
      console.error('Error fetching stories:', error.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStories(1);
  }, []);

  const loadMoreStories = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      fetchStories(page + 1);
      setPage(prevPage => prevPage + 1);
    }
  };

  // Render each story item
  const renderStory = useCallback(
    ({item}) => (
      <HomeListSkeleton loading={loading} story={item} theme={theme} />
    ),
    [loading, theme],
  );

  // Optimize FlatList's layout calculation
  const getItemLayout = useCallback(
    (_, index) => ({
      length: 120, // Approximate height of each item
      offset: 120 * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        renderItem={renderStory}
        keyExtractor={item => item._id}
        onEndReached={loadMoreStories}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<Loader loading={loadingMore} />}
        initialNumToRender={12}
        maxToRenderPerBatch={8}
        windowSize={5}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
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
