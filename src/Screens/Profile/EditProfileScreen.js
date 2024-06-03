import { Alert, Image, PermissionsAndroid, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../Contexts/ThemeProvider';
import { AuthContext } from '../../Contexts/AuthContext';
import CustomizeStatusBar from '../../Components/GeneralScreens/CustomizeStatusBar';
import Header from '../../Components/GeneralScreens/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { defaultImage } from '../../Data/default';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import {axiosFormInstance} from '../../axiosInstance';

const EditProfileScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { activeUser, setUserConfig, controlAuth } = useContext(AuthContext);

  const navigation = useNavigation();

  const userPhoto = `${activeUser.photo == null || activeUser.photo === '' ? defaultImage : activeUser.photo}`;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(userPhoto);

  const textInputRef = useRef(null);

  const setCursorColor = (color) => {
    if (textInputRef.current) {
      textInputRef.current.setNativeProps({ cursorColor: color });
    }
  };


  useEffect(() => {
    setUsername(activeUser.username);
    setEmail(activeUser.email);
    setPhoto(userPhoto);
    setCursorColor(theme.colors.text);
  }, [activeUser, theme, userPhoto]);

  const validateEmail = (checkEmail) => {
    return /\S+@\S+\.\S+/.test(checkEmail);
  };

  const isFormDisabled = !validateEmail(email) || username.length < 1;

  const disabledColor = 'grey';

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    mediaType: 'photo',
  };

  const selectImage = () => {
    Alert.alert(
      'Select Image',
      'Choose an option to select an image',
      [
        {
          text: 'Camera',
          onPress: () => launchCameraFromApp(),
        },
        {
          text: 'Gallery',
          onPress: () => launchGallery(),
        },
      ],
      { cancelable: true }
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchCameraFromApp = async () => {
    if (PermissionsAndroid.RESULTS.GRANTED || await requestCameraPermission()) {
      await launchCamera(options, response => {
        handleImageResponse(response);
      });
    }
  };

  const launchGallery = async () => {
    await launchImageLibrary(options, response => {
      handleImageResponse(response);
    });
  };

  const handleImageResponse = response => {
    if (!response.didCancel && !response.error) {
      setPhoto(response.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append('email', email);
    formdata.append('photo', {
      uri: photo,
      type: 'image/jpeg',
      name: 'userPhoto',
  });

    try {
      const config = await setUserConfig();
      await axiosFormInstance.post('/user/editProfile', formdata, config);

      showMessage({
        message: 'Edit profile Succesfully',
        type: 'success',
      });
      await controlAuth();
      navigation.reset({ routes: [{ name: 'ProfileNavigator' }] });
    }
    catch (err) {
      console.log(err.response.data.error);
      showMessage({
        message: err.response.data.error,
        type: 'danger',
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CustomizeStatusBar />
      <Header title="Edit Profile" showBackButton={true} />
      <View style={styles.basicInfo}>

        {/* Image */}
        <View style={[styles.imageBorder, { backgroundColor: theme.colors.secondary }]}>
          <Image source={{ uri: photo }} style={styles.userPhoto} />
          <TouchableOpacity onPress={selectImage} style={[styles.changeImageBtn, { backgroundColor: theme.colors.backgroundLight }]}>

            <MaterialCommunityIcons name="camera" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>


      </View>
      {/* UserName */}
      <View style={styles.details}>

        <View style={[styles.detailsRow, { backgroundColor: theme.colors.backgroundLight }]}>
          <MaterialCommunityIcons name="account-outline" size={24} color={theme.colors.secondary} />

          <TextInput style={[styles.detailsRowText, { color: theme.colors.text }]}
            ref={textInputRef}
            value={username}
            onChangeText={(value) => setUsername(value)}
            placeholder="username"
            autoCapitalize="none"
            placeholderTextColor={theme.name === 'light' ? 'lightgrey' : 'grey'}
          />
        </View>

        {/* Email */}
        <View style={[styles.detailsRow, { backgroundColor: theme.colors.backgroundLight }]}>
          <MaterialCommunityIcons name="email-outline" size={24} color={theme.colors.secondary} />

          <TextInput style={[styles.detailsRowText, { color: theme.colors.text }]}
            ref={textInputRef}
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={theme.name === 'light' ? 'lightgrey' : 'grey'}
          />
        </View>

      </View>

      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: isFormDisabled ? disabledColor : theme.colors.secondary }]}
        disabled={isFormDisabled}
        onPress={handleSubmit}
      >
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  basicInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    gap: 10,
  },
  changeImageBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -5,
    left: 25,
    zIndex: 5,
    borderRadius: 20,
    padding: 5,
  },
  imageBorder: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPhoto: {
    resizeMode: 'cover',
    height: 146,
    width: 146,
    borderRadius: 73,
  },
  username: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Comfortaa Bold',
    letterSpacing: 1,
  },
  details: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 60,
  },
  detailsRow: {
    minWidth: '90%',
    maxWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 10,
  },
  detailsRowText: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: 'Comfortaa Bold',
  },
  saveBtn: {
    padding: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  saveText: {
    color: 'white',
    fontFamily: 'Comfortaa Bold',
    fontSize: 18,
  },
});

