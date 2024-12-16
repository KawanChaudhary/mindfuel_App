import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import {AuthContext} from '../../Contexts/AuthContext';
import CustomizeStatusBar from '../../Components/GeneralScreens/CustomizeStatusBar';
import {defaultImage} from '../../Data/default';
import {Skeleton} from 'moti/skeleton';
import {useNavigation} from '@react-navigation/native';
import HorizontalLine from '../../Components/GeneralScreens/HorizontalLine';
import axiosInstance from '../../axiosInstance';
import {showMessage} from 'react-native-flash-message';
import MyStoriesListSkeleton from '../../Components/ProfileScreenComps/MyStoriesListSkeleton';
import MyStoriesEmpty from '../../Components/ProfileScreenComps/MyStoriesEmpty';
import HeaderWithIcon from '../../Components/GeneralScreens/HeaderWithIcon';

const ProfileScreen = () => {
  const {theme} = useContext(ThemeContext);
  const {activeUser, setUserConfig} = useContext(AuthContext);
  const navigation = useNavigation();

  const colorMode = theme.name;

  const [loading, setLoading] = useState(true);
  const [myStories, setMyStories] = useState([
    {_id: '1', title: 'Item 1'},
    {_id: '2', title: 'Item 2'},
    {_id: '3', title: 'Item 3'},
    {_id: '4', title: 'Item 4'},
  ]);
  const [anyStory, setAnystory] = useState(false);

  const getStories = useCallback(async () => {
    try {
      const config = await setUserConfig();
      const {data} = await axiosInstance.get('/user/myStories', config);

      setMyStories(data.data);
      setLoading(false);
      if (data.data.length) {
        setAnystory(true);
      }
    } catch (error) {
      showMessage({
        message: error.response.data.error,
        type: 'danger',
      });
    }
  }, [setUserConfig]);

  useEffect(() => {
    getStories();
  }, [getStories]);

  const userPhoto = `${
    activeUser.photo == null || activeUser.photo === ''
      ? defaultImage
      : activeUser.photo
  }`;

  const renderStory = ({item}) => (
    <MyStoriesListSkeleton loading={loading} story={item} theme={theme} />
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CustomizeStatusBar />

      <HeaderWithIcon
        title={' '}
        iconName={'settings-outline'}
        handleIconPress={() => navigation.navigate('settings')}
      />

      <View style={styles.infoContainer}>
        <View style={styles.basicInfo}>
          {/* Image */}

          <Skeleton
            width={80}
            height={80}
            radius={'round'}
            colorMode={colorMode}
            key={activeUser.photo}>
            {loading ? null : (
              <Image source={{uri: userPhoto}} style={styles.userPhoto} />
            )}
          </Skeleton>

          {/* UserName */}

          <View style={[styles.basicInfoChild, loading && styles.gap15]}>
            <Skeleton
              width={'70%'}
              height={15}
              radius={0}
              colorMode={colorMode}
              key={activeUser.username}>
              {loading ? null : (
                <Text style={[styles.username, {color: theme.colors.text}]}>
                  {activeUser.username}
                </Text>
              )}
            </Skeleton>

            {/* Email */}

            <Skeleton
              width={'80%'}
              height={10}
              radius={0}
              colorMode={colorMode}
              key={activeUser.email}>
              {loading ? null : (
                <Text style={[styles.email, {color: theme.colors.text}]}>
                  {activeUser.email}
                </Text>
              )}
            </Skeleton>
          </View>
        </View>

        {/* Buttons */}

        <View style={styles.btnView}>
          <Skeleton
            width={'100%'}
            height={40}
            radius={'round'}
            colorMode={colorMode}
            key={activeUser.createdAt}>
            {loading ? null : (
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[
                    styles.editButton,
                    {backgroundColor: theme.colors.text},
                  ]}
                  onPress={() => navigation.navigate('editprofile')}>
                  <Text
                    style={[styles.btnText, {color: theme.colors.background}]}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.passowordButton,
                    {borderColor: theme.colors.text},
                  ]}
                  onPress={() => navigation.navigate('changepassword')}>
                  <Text style={[styles.btnText, {color: theme.colors.text}]}>
                    Change Password
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Skeleton>
        </View>
      </View>

      <View style={styles.storyContainer}>
        <Text style={[styles.storiesHeading, {color: theme.colors.text}]}>
          My Stories
        </Text>

        <HorizontalLine />

        {loading || anyStory ? (
          <FlatList
            data={myStories}
            renderItem={renderStory}
            keyExtractor={item => item._id}
          />
        ) : (
          <MyStoriesEmpty theme={theme} navigation={navigation} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  basicInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  basicInfoChild: {
    flexDirection: 'column',
  },
  gap15: {
    gap: 15,
  },
  userPhoto: {
    resizeMode: 'cover',
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Comfortaa Bold',
  },
  email: {
    fontSize: 16,
    fontFamily: 'Comfortaa Regular',
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 35,
    width: '50%',
  },
  passowordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 35,
    borderWidth: 1,
    width: '50%',
  },
  btnText: {
    fontSize: 15,
    fontFamily: 'Comfortaa Bold',
  },

  // story style

  storyContainer: {
    marginTop: 20,
  },
  storiesHeading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontFamily: 'RubikBubbles-Regular',
    letterSpacing: 1,
  },
});

export default ProfileScreen;
