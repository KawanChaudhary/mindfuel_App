import React, {useContext, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, Text} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {fetchStoriesRequest} from '../../Redux/Actions/storyActions';
import HomeListSkeleton from './StoryCard/HomeListSkeleton';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import {intialStory} from '../../Data/default';
import {useFocusEffect} from '@react-navigation/native';

const AllStory = () => {
  const {theme} = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [allStories, setAllStories] = useState(intialStory);
  const {stories, loading, hasMore, page, refreshing} = useSelector(
    state => ({
      stories: state.story.stories,
      loading: state.story.loading,
      hasMore: state.story.hasMore,
      page: state.story.page,
      refreshing: state.story.refreshing,
    }),
    shallowEqual,
  );

  useFocusEffect(() => {
    dispatch(fetchStoriesRequest(1));
  }, [dispatch]);

  useEffect(() => {
    setAllStories(loading && page === 1 ? intialStory : stories);
  }, [stories, loading, page]);

  const loadMoreStories = () => {
    if (hasMore && !loading) {
      dispatch(fetchStoriesRequest(page + 1));
    }
  };

  const onRefresh = () => {
    dispatch(fetchStoriesRequest(1));
  };

  const renderStory = ({item}) => (
    <HomeListSkeleton
      loading={loading && page === 1}
      story={item}
      theme={theme}
    />
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: 120,
      offset: 120 * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={allStories}
        renderItem={renderStory}
        keyExtractor={item => item._id}
        onEndReached={loadMoreStories}
        onEndReachedThreshold={0.5}
        initialNumToRender={12}
        maxToRenderPerBatch={8}
        windowSize={5}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          !loading && stories.length === 0 ? (
            <Text style={styles.emptyText}>No stories available</Text>
          ) : null
        }
      />
    </View>
  );
};

export default AllStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});
