import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../Contexts/ThemeProvider';
import { SearchBar } from 'react-native-elements';
import CustomizeStatusBar from '../../Components/GeneralScreens/CustomizeStatusBar';
import Header from '../../Components/GeneralScreens/Header';
import axiosInstance from '../../axiosInstance';
import { showMessage } from 'react-native-flash-message';
import HomeListSkeleton from '../../Components/StoryScreens/StoryCard/HomeListSkeleton';
import { FlatList } from 'react-native-gesture-handler';

const SearchScreen = () => {
  const { theme } = useContext(ThemeContext);

  const [search, setSearch] = useState('');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      setStories([]);
      updateSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const updateSearch = async value => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.get(
        `/story/getAllStories?search=${value || ''}`
      );
      setStories(data.data);
      setLoading(false);
    } catch (error) {
      showMessage({
        message: error.response.data.error,
        type: 'danger',
      });
    }
  };

  const renderStory = ({ item }) => (
    <HomeListSkeleton
      loading={loading}
      story={item}
      theme={theme}
      showShare={false}
    />
  );

  const emptyListComponent = () => (
    <View style={styles.noStoryContainer}>
      <Text style={[styles.noStoryText1, { color: theme.colors.text }]}>
        No Story Found
      </Text>
      <Text style={[styles.noStoryText2, { color: theme.colors.text }]}>
        Please try a different search term
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CustomizeStatusBar />
      <Header title="Explore" showBackButton={false} />
      <SearchBar
        placeholder="Search Mind Fuel"
        onChangeText={setSearch}
        value={search}
        clearIcon={true}
        containerStyle={[
          styles.searchContainer,
          { backgroundColor: theme.colors.background },
        ]}
        inputContainerStyle={[
          styles.inputContainer,
          { backgroundColor: theme.colors.backgroundLight },
        ]}
        inputStyle={[styles.input, { color: theme.colors.text }]}
        showLoading={loading}
      />
      {debouncedSearch.length >= 3 ? (
        <FlatList
          data={stories}
          renderItem={renderStory}
          keyExtractor={item => item._id}
          ListEmptyComponent={emptyListComponent}
        />
      ) : (
        <View style={styles.noSearchContainer}>
          <Text style={[styles.noStoryText1, { color: theme.colors.text }]}>
            Search for the best match
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginVertical: 5,
  },
  inputContainer: {
    borderRadius: 20,
  },
  input: {
    fontFamily: 'Comfortaa Regular',
    fontSize: 16,
  },
  noStoryContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  noSearchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  noStoryText1: {
    fontFamily: 'Comfortaa Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  noStoryText2: {
    fontFamily: 'Comfortaa Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});
