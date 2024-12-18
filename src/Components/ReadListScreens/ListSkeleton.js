import {Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Skeleton} from 'moti/skeleton';
import {
  defaultImageFunc,
  editDate,
  shareContent,
  truncateTitle,
} from '../../Data/commonFunctions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListSkeleton = ({loading, theme, story, navigation, onPressBookmark}) => {
  const colormode = theme.name;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DetailStory', {storySlug: story.slug})
      }
      style={[styles.listSkeletonContainer]}>
      {/* User Name and Photo */}

      <View style={[styles.authorInfo]}>
        <Skeleton width={20} height={20} radius={'round'} colorMode={colormode}>
          {loading ? null : (
            <Image
              source={{uri: defaultImageFunc(story.author.photo)}}
              style={styles.authorPhoto}
            />
          )}
        </Skeleton>
        <Skeleton width={'50%'} height={10} radius={0} colorMode={colormode}>
          {loading ? null : (
            <Text style={[styles.username, {color: theme.colors.text}]}>
              {story.author.username}
            </Text>
          )}
        </Skeleton>
      </View>

      {/* Story Title */}
      <View style={[styles.storyDetails]}>
        <View style={styles.titleContainer}>
          <Skeleton
            width={'100%'}
            height={10}
            radius={0}
            colorMode={colormode}
            key={story.title}>
            {loading ? null : (
              <Text style={[styles.title, {color: theme.colors.text}]}>
                {truncateTitle(story.title)}
              </Text>
            )}
          </Skeleton>
          {loading && (
            <Skeleton
              width={'50%'}
              height={10}
              radius={0}
              colorMode={colormode}
            />
          )}
        </View>
        <Skeleton
          width={100}
          height={50}
          radius={0}
          key={story.image}
          colorMode={colormode}>
          {loading ? null : (
            <Image source={{uri: story.image}} style={styles.storyImage} />
          )}
        </Skeleton>
      </View>

      {/* Other Details */}

      <Skeleton
        width={'50%'}
        height={10}
        radius={0}
        key={story.image}
        colorMode={colormode}>
        {loading ? null : (
          <View style={styles.otherDetails}>
            <Text style={[styles.detailsText, {}]}>
              {story.readtime} min read • {editDate(story.createdAt)}
            </Text>

            <View style={styles.storyIcons}>
              <TouchableOpacity onPress={() => onPressBookmark(story.slug)}>
                <Ionicons
                  name={'bookmark'}
                  color={theme.colors.text}
                  size={18}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => shareContent(story)}>
                <Ionicons
                  name={'share-outline'}
                  color={theme.colors.text}
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Skeleton>
    </TouchableOpacity>
  );
};

export default ListSkeleton;

const styles = StyleSheet.create({
  listSkeletonContainer: {
    paddingHorizontal: 15,
    gap: 10,
    marginVertical: 5,
  },
  authorInfo: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  authorPhoto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  username: {
    fontSize: 12,
    fontFamily: 'Comfortaa Regular',
  },
  storyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    width: '60%',
    gap: 15,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Comfortaa Bold',
    lineHeight: 20,
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: 100,
    height: 50,
    resizeMode: 'cover',
  },
  otherDetails: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsText: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Comfortaa SemiBold',
    letterSpacing: 1,
  },
  storyIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});
