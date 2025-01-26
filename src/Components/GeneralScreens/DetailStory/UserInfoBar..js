import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {defaultImageFunc} from '../../../Data/commonFunctions';
import {useDispatch} from 'react-redux';
import {deleteStoryById} from '../../../Redux/Actions/storyActions';

const UserInfoBar = ({
  theme,
  story,
  activeUser,
  setUserConfig,
  navigation,
  openEditStoryModal,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const config = await setUserConfig();
    Alert.alert(
      'Delete Story',
      'Do you want to delete this story?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              dispatch(deleteStoryById(story, config));
              showMessage({
                message: 'Story deleted successfully',
                type: 'success',
              });

              setTimeout(() => {
                navigation.goBack();
              }, 1000);
            } catch (error) {
              showMessage({
                message: error.response.data.error,
                type: 'danger',
              });
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {/* Left side: User photo and username */}
      {story.author && (
        <View style={styles.left}>
          <Image
            source={{uri: defaultImageFunc(story.author.photo)}}
            style={styles.userPhoto}
          />
          <Text style={[styles.username, {color: theme.colors.text}]}>
            {story.author.username}
          </Text>
        </View>
      )}

      {/* Right side: Date and read time */}

      {activeUser && story.author && story.author._id === activeUser._id ? (
        <View style={styles.right}>
          <TouchableOpacity onPress={openEditStoryModal}>
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              color={theme.colors.primary}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              color={theme.colors.secondary}
              size={25}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderRadius: 15,
    padding: 6,
    marginHorizontal: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontFamily: 'Comfortaa Bold',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginRight: 5,
  },
});

export default UserInfoBar;
