import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Skeleton} from 'moti/skeleton';
import {defaultImage} from '../../Data/default';
import {editDate} from '../../Data/commonFunctions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserTab = ({activeUser, theme, loading}) => {
  const colorMode = theme.name;

  const userPhoto = `${
    activeUser.photo == null || activeUser.photo === ''
      ? defaultImage
      : activeUser.photo
  }`;

  return (
    <View style={styles.userTabContainer}>
      <View style={styles.avatar}>
        <Skeleton
          width={80}
          height={80}
          radius={'round'}
          colorMode={colorMode}
          key={activeUser._id}>
          {loading ? null : (
            <Image source={{uri: userPhoto}} style={styles.image} />
          )}
        </Skeleton>
      </View>

      <View style={loading && styles.gap15}>
        <Skeleton
          width={'50%'}
          height={10}
          radius={0}
          colorMode={colorMode}
          key={activeUser.username}>
          {loading ? null : (
            <Text style={[styles.username, {color: theme.colors.text}]}>
              {activeUser.username}
            </Text>
          )}
        </Skeleton>

        <Skeleton
          width={'70%'}
          height={10}
          radius={0}
          colorMode={colorMode}
          key={activeUser.readListLength}>
          {loading ? null : (
            <View style={styles.raedListContainer}>
              <Text style={[styles.readList, {color: theme.colors.text}]}>
                {editDate(Date.now())} • {activeUser.readListLength} stories
              </Text>
              <Ionicons
                name={'lock-closed'}
                color={theme.colors.text}
                size={16}
              />
            </View>
          )}
        </Skeleton>
      </View>
    </View>
  );
};

export default UserTab;

const styles = StyleSheet.create({
  userTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    marginHorizontal: 20,
    gap: 10,
    marginVertical: 10,
  },
  gap15: {
    gap: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
  },
  image: {
    resizeMode: 'cover',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Comfortaa Bold',
  },
  raedListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  readList: {
    fontSize: 14,
    fontFamily: 'Comfortaa Bold',
  },
});
