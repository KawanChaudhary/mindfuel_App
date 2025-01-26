import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Skeleton} from 'moti/skeleton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {formatDateRelativeToNow} from '../../../Data/commonFunctions';
import axios from '../../../axiosInstance';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import {defaultImage} from '../../../Data/default';

const CommentSkeleton = ({
  theme,
  comment,
  auth,
  activeUser,
  setUserConfig,
  closeModal,
}) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const colorMode = theme.name;

  const userPhoto = `${
    comment.author.photo == null || comment.author.photo === ''
      ? defaultImage
      : comment.author.photo
  }`;

  useEffect(() => {
    const getCommentLikeStatus = async () => {
      const comment_id = comment._id;
      if (auth) {
        try {
          const config = await setUserConfig();
          const {data} = await axios.post(
            `/comment/${comment_id}/getCommentLikeStatus`,
            {activeUser},
            config,
          );
          setLikeStatus(data.likeStatus);
        } catch (error) {
          setLikeStatus(false);
        }
      }
    };

    getCommentLikeStatus();
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [auth, setUserConfig, activeUser, comment, navigation]);

  const handleCommentLike = async () => {
    const comment_id = comment._id;

    if (auth) {
      try {
        const config = await setUserConfig();
        const {data} = await axios.post(
          `/comment/${comment_id}/like`,
          {activeUser},
          config,
        );

        setLikeCount(data.data.likeCount);
        setLikeStatus(data.likeStatus);
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
      closeModal();
      showMessage({
        message: 'Please login first',
        type: 'danger',
      });
      setTimeout(() => {
        navigation.navigate('ProfileNavigator');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.avatar}>
          <Skeleton
            width={40}
            height={40}
            radius={'round'}
            colorMode={colorMode}
            key={comment.author.commentDetails}>
            {loading ? null : (
              <Image source={{uri: userPhoto}} style={styles.image} />
            )}
          </Skeleton>
        </View>
        <View style={[styles.commentDetails, loading ? styles.PT5 : null]}>
          <Skeleton
            width={'90%'}
            height={10}
            radius={'round'}
            colorMode={colorMode}
            key={comment.author.username}>
            {loading ? null : (
              <View style={styles.author}>
                <Text style={[styles.username, {color: theme.colors.text}]}>
                  {comment.author.username}
                </Text>
                <Text style={[styles.createdAt]}>
                  {formatDateRelativeToNow(comment.createdAt)}
                </Text>
              </View>
            )}
          </Skeleton>

          <View style={loading ? styles.PT12 : null}>
            <Skeleton
              width={'60%'}
              height={10}
              radius={'round'}
              colorMode={colorMode}
              key={comment.content}>
              {loading ? null : (
                <Text style={[styles.content, {color: theme.colors.text}]}>
                  {comment.content}
                </Text>
              )}
            </Skeleton>
          </View>
        </View>
      </View>
      {!loading && (
        <Pressable style={styles.heartIcon} onPress={handleCommentLike}>
          <FontAwesome
            name={likeStatus ? 'heart' : 'heart-o'}
            size={16}
            color={likeStatus ? theme.colors.secondary : 'grey'}
          />
          {likeCount > 0 && (
            <Text style={[styles.contentLike, {color: theme.colors.text}]}>
              {likeCount}
            </Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default CommentSkeleton;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingTop: 2,
  },
  image: {
    resizeMode: 'cover',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  user: {
    flexDirection: 'row',
    gap: 10,
  },
  commentDetails: {
    justifyContent: 'flex-start',
    gap: -1,
  },
  author: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  heartIcon: {
    paddingTop: 10,
    alignItems: 'center',
  },
  username: {
    fontSize: 13,
    fontFamily: 'Comfortaa Bold',
  },
  createdAt: {
    fontSize: 12,
    fontFamily: 'Comfortaa Regular',
    color: 'grey',
  },
  content: {
    fontSize: 12,
    fontFamily: 'Comfortaa Regular',
  },
  contentLike: {
    fontSize: 12,
    fontFamily: 'Comfortaa Regular',
  },
  PT12: {
    paddingTop: 12,
  },
  PT5: {
    paddingTop: 5,
  },
});
