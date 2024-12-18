import React, {useCallback, useContext, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CustomizeStatusBar from '../../Components/GeneralScreens/CustomizeStatusBar';
import Header from '../../Components/GeneralScreens/Header';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import {AuthContext} from '../../Contexts/AuthContext';
import UserTab from '../../Components/ReadListScreens/UserTab';

import axios from '../../axiosInstance';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import HorizontalLine from '../../Components/GeneralScreens/HorizontalLine';
import ListSkeleton from '../../Components/ReadListScreens/ListSkeleton';
import NoItemInList from '../../Components/ReadListScreens/NoItemInList';

const ReadListScreen = () => {
  const navigation = useNavigation();

  const {theme} = useContext(ThemeContext);
  const {activeUser, setUserConfig, auth} = useContext(AuthContext);

  const [readList, setReadList] = useState([
    {_id: '1', title: 'Item 1'},
    {_id: '2', title: 'Item 2'},
    {_id: '3', title: 'Item 3'},
    {_id: '4', title: 'Item 4'},
  ]);

  const [loading, setLoading] = useState(true);
  const [anyStory, setAnyStory] = useState(false);

  const getUserReadingList = useCallback(async () => {
    if (auth) {
      try {
        const config = await setUserConfig();
        const {data} = await axios.get('/user/readList', config);
        setReadList(data.data);

        setLoading(false);
        if (data.data.length > 0) {
          setAnyStory(true);
        } else {
          setAnyStory(false);
        }
      } catch (error) {
        showMessage({
          message: `${error.response.data.error}`,
          type: 'danger',
        });
      }
    }
  }, [auth, setUserConfig]);

  useFocusEffect(
    useCallback(() => {
      getUserReadingList();
    }, [getUserReadingList]),
  );

  const onPressBookmark = async storySlug => {
    if (auth === false) {
      showMessage({
        message: 'Please login first',
        type: 'danger',
      });
      setTimeout(() => {
        navigation.navigate('ProfileNavigator');
      }, 2000);
    } else {
      try {
        const config = await setUserConfig();
        await axios.post(
          `/user/${storySlug}/addStoryToReadList`,
          {activeUser},
          config,
        );
        await getUserReadingList();
      } catch (error) {
        showMessage({
          message: `${error.response.data.error}`,
          type: 'danger',
        });
      }
    }
  };

  const renderStory = ({item}) => (
    <ListSkeleton
      loading={loading}
      theme={theme}
      story={item}
      navigation={navigation}
      onPressBookmark={onPressBookmark}
    />
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CustomizeStatusBar />
      <Header title="Your library" showBackButton={false} />
      <UserTab activeUser={activeUser} theme={theme} loading={loading} />

      {/* ReadList Text */}
      <Text style={[styles.readListText, {color: theme.colors.text}]}>
        {!loading && 'Reading List'}
      </Text>
      <HorizontalLine theme={theme} />

      <FlatList
        data={readList}
        renderItem={renderStory}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={<HorizontalLine theme={theme} />}
        ListEmptyComponent={
          !loading &&
          !anyStory && <NoItemInList theme={theme} navigation={navigation} />
        }
      />
    </View>
  );
};

export default ReadListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  readListText: {
    fontSize: 30,
    fontFamily: 'RubikBubbles-Regular',
    marginTop: 5,
    marginHorizontal: 20,
    letterSpacing: 1,
  },
});
