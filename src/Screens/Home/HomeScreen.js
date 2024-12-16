import React, {useContext} from 'react';
import CustomizeStatusBar from '../../Components/GeneralScreens/CustomizeStatusBar';
import {View} from 'moti';
import {StyleSheet} from 'react-native';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import AllStories from '../../Components/StoryScreens/AllStories';
import HorizontalLine from '../../Components/GeneralScreens/HorizontalLine';
import AddStoryButton from '../../Components/AddStory/AddStoryButton';
import HeaderWithIcon from '../../Components/GeneralScreens/HeaderWithIcon';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CustomizeStatusBar />
      <HeaderWithIcon
        title={'Home'}
        iconName={'notifications-outline'}
        handleIconPress={() => navigation.navigate('notifications')}
      />
      <HorizontalLine />
      <AllStories />
      <AddStoryButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
