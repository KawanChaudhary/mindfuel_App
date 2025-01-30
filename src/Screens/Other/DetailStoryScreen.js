import React, {useCallback, useContext, useEffect, useState} from 'react';
import CustomizeStatusBar from '../../Components/GeneralScreens/CustomizeStatusBar';
import {View} from 'moti';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';
import UserInfoBar from '../../Components/GeneralScreens/DetailStory/UserInfoBar.';

import RenderHTML from 'react-native-render-html';
import StoryInfoBar from '../../Components/GeneralScreens/DetailStory/StoryInfoBar';
import Interaction from '../../Components/GeneralScreens/DetailStory/Interaction';
import Loader from '../../Components/GeneralScreens/Loader';
import CommentPopUp from '../../Components/GeneralScreens/DetailStory/CommentPopUp';
import {AuthContext} from '../../Contexts/AuthContext';
import {showMessage} from 'react-native-flash-message';
import EditStoryModal from '../../Components/GeneralScreens/DetailStory/EditStory/EditStoryModal';
import HeaderWithIcon from '../../Components/GeneralScreens/HeaderWithIcon';
import {defaultImageFunc, shareContent} from '../../Data/commonFunctions';

const DetailStoryScreen = ({route}) => {
  const {theme} = useContext(ThemeContext);
  const {activeUser, setUserConfig, auth} = useContext(AuthContext);
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const {storySlug} = route.params;

  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);
  const [storyReadListStatus, setStoryReadListStatus] = useState(false);

  // CommentModal
  const [CommentModalVisible, setCommentModalVisible] = useState(false);

  // EditStoryModal
  const [editStoryModal, setEditStoryModal] = useState(false);

  const getDetailStory = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.post(`/story/${storySlug}`, {
        activeUser,
      });
      setStory(() => data.data);
      setLikeStatus(data.likeStatus);
      setLikeCount(data.data.likeCount);
      setCommentCount(data.data.commentCount);
      setStoryReadListStatus(data.data.readList.includes(activeUser._id));
      setLoading(false);
    } catch (error) {
      setStory({});
      showMessage({
        message: 'Failed to fetch story details',
        type: 'danger',
      });
    }
  }, [storySlug, setLoading, activeUser]);

  useEffect(() => {
    getDetailStory();
  }, [getDetailStory]);

  const contentStyle = {
    h1: {
      fontFamily: 'Comfortaa Regular',
      color: theme.colors.text,
    },
    h2: {
      fontFamily: 'Comfortaa Regular',
      color: theme.colors.text,
    },
    h3: {
      fontFamily: 'Comfortaa Regular',
      color: theme.colors.text,
    },
    h4: {
      fontFamily: 'Comfortaa Regular',
      color: theme.colors.text,
    },
    h5: {
      fontFamily: 'Comfortaa Regular',
      color: theme.colors.text,
    },
    h6: {
      fontFamily: 'Comfortaa Regular',
      color: theme.colors.text,
    },
    p: {
      fontFamily: 'Comfortaa Thin',
      color: theme.colors.text,
    },
    li: {
      fontFamily: 'Comfortaa SemiBold',
      color: theme.colors.text,
    },
    ul: {
      fontFamily: 'Comfortaa SemiBold',
      color: theme.colors.text,
    },
    ol: {
      fontFamily: 'Comfortaa SemiBold',
      color: theme.colors.text,
    },
  };

  const onPressLike = async () => {
    if (auth === false) {
      showMessage({
        message: 'Please login first',
        type: 'danger',
      });
      setTimeout(() => {
        navigation.navigate('ProfileNavigator');
      }, 2000);
    } else {
      setLikeStatus(prevLikeStatus => !prevLikeStatus);
      setLikeCount(prevLikes => (likeStatus ? prevLikes - 1 : prevLikes + 1));
      const config = await setUserConfig();
      try {
        const {data} = await axiosInstance.post(
          `/story/${storySlug}/like`,
          {activeUser},
          config,
        );
        setLikeCount(data.data.likeCount);
      } catch (error) {
        setStory({});
        showMessage({
          message: error.response?.data?.error || 'Failed to like the story',
          type: 'danger',
        });
      }
    }
  };

  const onPressComment = () => {
    openCommentModal();
  };

  const onPressBookmark = async () => {
    if (auth === false) {
      showMessage({
        message: 'Please login first',
        type: 'danger',
      });
      setTimeout(() => {
        navigation.navigate('ProfileNavigator');
      }, 2000);
    } else {
      setStoryReadListStatus(prevReadListStatus => !prevReadListStatus);
      try {
        const config = await setUserConfig();
        const {data} = await axiosInstance.post(
          `/user/${storySlug}/addStoryToReadList`,
          {activeUser},
          config,
        );
        setStoryReadListStatus(data.status);
      } catch (error) {
        showMessage({
          message: error.response?.data?.error || 'Failed to bookmark story',
          type: 'danger',
        });
      }
    }
  };

  const openCommentModal = () => {
    setCommentModalVisible(true);
  };

  const openEditStoryModal = () => setEditStoryModal(true);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.colors.backgroundLight},
      ]}>
      <CustomizeStatusBar />
      <HeaderWithIcon
        title="Story"
        showBackButton={true}
        handleIconPress={() => shareContent(story)}
        iconName={'share-outline'}
      />
      <Loader loading={loading} showChildren={!loading}>
        <ScrollView>
          <UserInfoBar
            theme={theme}
            story={story}
            activeUser={activeUser}
            setUserConfig={setUserConfig}
            navigation={navigation}
            openEditStoryModal={openEditStoryModal}
          />
          <View
            style={[
              styles.detailsContainer,
              {backgroundColor: theme.colors.background},
            ]}>
            <StoryInfoBar
              theme={theme}
              createdAt={story.createdAt}
              readTime={story.readtime}
              iconSize={20}
            />

            <Text style={[styles.titleText, {color: theme.colors.text}]}>
              {story.title}
            </Text>
            <Image
              source={{uri: defaultImageFunc(story.image)}}
              style={styles.image}
            />
            <RenderHTML
              contentWidth={width}
              source={{html: story.content || '<p>No content available</p>'}}
              tagsStyles={contentStyle}
            />
          </View>
        </ScrollView>

        <Interaction
          theme={theme}
          likeStatus={likeStatus}
          likes={likeCount}
          comments={commentCount}
          bookmarked={storyReadListStatus}
          onPressBookmark={onPressBookmark}
          onPressComment={onPressComment}
          onPressLike={onPressLike}
        />
        <CommentPopUp
          visible={CommentModalVisible}
          handleClose={setCommentModalVisible}
          storySlug={story.slug}
          theme={theme}
          auth={auth}
          setUserConfig={setUserConfig}
          navigation={navigation}
          activeUser={activeUser}
        />

        <EditStoryModal
          visible={editStoryModal}
          closeModal={setEditStoryModal}
          story={story}
          theme={theme}
          setUserConfig={setUserConfig}
          getDetailStory={getDetailStory}
        />
      </Loader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 10,
    marginTop: 10,
    paddingBottom: 60,
    gap: 10,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Comfortaa Bold',
  },
  image: {
    aspectRatio: 16 / 9,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
  },
  CommentModalView: {
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  CommentModalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default DetailStoryScreen;
