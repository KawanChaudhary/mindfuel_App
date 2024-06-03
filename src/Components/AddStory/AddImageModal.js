import { Alert, Dimensions, Image, Modal, PermissionsAndroid, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

const AddImageModal = ({ visible, handleClose, theme, storyImage, setStoryImage, submitHandle }) => {

  const closeModal = () => handleClose(false);

  const options = {
    mediaType: 'photo',
    quality: 1,
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
    if (await requestCameraPermission()) {
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
      setStoryImage(response.assets[0].uri);
    }
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={closeModal}
      style={styles.modalContainer}>
      <Pressable onPress={closeModal} style={styles.container}>

        <View style={[styles.modalBody, { backgroundColor: theme.name === 'light' ? theme.colors.background : theme.colors.backgroundLight }]}>

          <TouchableOpacity style={[styles.imageContainer, {borderColor:theme.colors.text}]} onPress={selectImage}>

            {
              storyImage ?
                <Image source={{ uri: storyImage }} style={styles.image} />
                :
                <View style={styles.notImage}>

                  <Feather name="upload" color={theme.colors.text} size={25} />

                  <Text style={[styles.imageText, {color:theme.colors.text}]}>
                    Include a high-quality image in your story to make it more inviting to readers.
                    </Text>
                </View>
            }

          </TouchableOpacity>

          <TouchableOpacity style={[styles.publishButton, {backgroundColor:theme.colors.secondary}]} onPress={submitHandle}>
            <Text style={[styles.publishText]}>Publish</Text>
          </TouchableOpacity>

        </View>
      </Pressable>
    </Modal>
  );
};

export default AddImageModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBody: {
    alignItems: 'center',
    justifyContent:'space-evenly',
    borderTopWidth:0.5,
    borderEndWidth:0.5,
    borderStartWidth:0.5,
    width: '100%',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    minHeight: 300,
    height: 200,
    maxHeight: 600,
    gap:20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height * 0.2,
    minWidth: width * 0.8,
    maxHeight: height * 0.2,
    maxWidth: width * 0.8,
    borderWidth: 0.5,
    borderRadius:10,
  },
  image :{
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height * 0.2,
    minWidth: width * 0.8,
    maxHeight: height * 0.2,
    maxWidth: width * 0.8,
    resizeMode: 'cover',
    borderRadius:10,
  },
  notImage:{
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    gap:15,
  },
  imageText:{
    fontSize: 14,
    textAlign:'center',
    fontFamily:'Comfortaa Regular',
    lineHeight:20,
  },
  publishButton:{
    justifyContent:'center',
    alignItems:'center',
    padding:12,
    width:'90%',
    maxWidth: width * 0.8,
    borderRadius:10,
  },
  publishText:{
    color:'white',
    fontSize:16,
    fontFamily:'Comfortaa Bold',
  },
});
