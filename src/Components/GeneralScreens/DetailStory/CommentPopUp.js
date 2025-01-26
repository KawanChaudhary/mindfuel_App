import {
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axiosInstance from '../../../axiosInstance';
import CommentSkeleton from './CommentSkeleton';
import AddComment from './AddComment';
import {showMessage} from 'react-native-flash-message';

const CommentPopUp = ({
  visible,
  handleClose,
  storySlug,
  theme,
  auth,
  setUserConfig,
  navigation,
  activeUser,
}) => {
  const [count, setCount] = useState(0);
  const [commentlist, setCommentList] = useState([]);

  const closeModal = () => handleClose(false);

  const getStoryComments = useCallback(async () => {
    try {
      const {data} = await axiosInstance.get(
        `/comment/${storySlug}/getAllComment`,
      );
      setCommentList(data.data);
      setCount(data.count);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }, [storySlug]);

  useEffect(() => {
    getStoryComments();
  }, [getStoryComments]);

  const handleSubmitComment = async content => {
    if (auth) {
      try {
        const config = await setUserConfig();
        await axiosInstance.post(
          `/comment/${storySlug}/addComment`,
          {content},
          config,
        );
        getStoryComments();
        Keyboard.dismiss();
      } catch (error) {
        if (error.response.data.error === 'Jwt expired') {
          showMessage({
            message: 'Please Login',
            type: 'danger',
          });
          navigation.navigate('ProfileNavigator');
        } else {
          showMessage({
            message: `${error.response.data.error}`,
            type: 'danger',
          });
        }
      }
    } else {
      showMessage({
        message: 'Please login first',
        type: 'danger',
      });
      navigation.navigate('ProfileNavigator');
    }
  };

  const renderComment = ({item}) => (
    <CommentSkeleton
      theme={theme}
      comment={item}
      auth={auth}
      activeUser={activeUser}
      setUserConfig={setUserConfig}
      closeModal={closeModal}
    />
  );

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={closeModal}>
      <Pressable style={styles.container} onPress={closeModal}>
        <Pressable
          style={[
            styles.modalBody,
            {
              backgroundColor:
                theme.name === 'light'
                  ? theme.colors.background
                  : theme.colors.backgroundLight,
            },
          ]}
          onPress={() => {}}>
          <View style={styles.topBar} />
          <View style={styles.comments}>
            <Text style={[styles.commentsText, {color: theme.colors.text}]}>
              Comments
            </Text>
          </View>
          {count > 0 ? (
            <FlatList
              data={commentlist}
              renderItem={renderComment}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.commentList}
            />
          ) : (
            <View style={styles.noComments}>
              <Text style={[styles.noCommentsYet, {color: theme.colors.text}]}>
                No Comments yet
              </Text>
              <Text
                style={[styles.startConversation, {color: theme.colors.text}]}>
                Start the conversation.
              </Text>
            </View>
          )}
          {auth && (
            <AddComment handleSubmit={handleSubmitComment} theme={theme} />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CommentPopUp;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBody: {
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    minHeight: 400,
    height: 200,
  },
  topBar: {
    width: 60,
    height: 5,
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  comments: {
    width: '100%',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: 'grey',
  },
  commentList: {
    paddingBottom: 20,
  },
  commentsText: {
    fontSize: 18,
    fontFamily: 'Comfortaa Bold',
  },
  noComments: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCommentsYet: {
    fontSize: 18,
    fontFamily: 'Comfortaa Bold',
    marginTop: 100,
  },
  startConversation: {
    fontSize: 12,
    fontFamily: 'Comfortaa Regular',
  },
});
