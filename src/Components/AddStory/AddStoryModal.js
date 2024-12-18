import React, {useContext, useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AddImageModal from './AddImageModal';
import {AuthContext} from '../../Contexts/AuthContext';

import {axiosFormInstance} from '../../axiosInstance';
import {showMessage} from 'react-native-flash-message';

const AddStoryModal = ({visible, closeModal}) => {
  const handleClose = () => closeModal(false);

  const navigation = useNavigation();

  const {theme} = useContext(ThemeContext);
  const {setUserConfig} = useContext(AuthContext);

  const contentTextRef = useRef();
  const titleInputRef = useRef(null);

  const setCursorColor = color => {
    if (titleInputRef.current) {
      titleInputRef.current.setNativeProps({cursorColor: color});
    }
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [storyImage, setStoryImage] = useState(null);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);

  const richTextHandle = contentText => {
    if (contentText) {
      setContent(contentText);
    } else {
      setContent('');
    }
  };

  const closeHandle = () => {
    if (content.trim().length || title.trim().length) {
      Alert.alert(
        'Discard Changes ?',
        'You will lose all of the changes that have been made yet.',
        [
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              setContent('');
              setTitle('');
              handleClose();
            },
          },
          {
            text: 'Continue',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      clearInputs();
      handleClose();
    }
  };

  const nextHandle = () => {
    const replaceWhiteSpace = content.replace(/&nbsp;/g, '').trim();
    setContent(replaceWhiteSpace);

    if (content.length <= 0 || title.length <= 0) {
      Alert.alert(
        'Confirm?',
        'You need to write something before publishing.',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      openModal(true);
    }
  };

  const submitHandle = async () => {
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', content);
    formdata.append('image', {
      uri: storyImage,
      type: 'image/jpeg',
      name: 'storyImage',
    });

    // console.log(formdata);

    try {
      const config = await setUserConfig();

      await axiosFormInstance.post('/story/addstory', formdata, config);

      showMessage({
        message: 'Your story is live.',
        type: 'success',
      });
      handleClose();
      setTimeout(() => {
        navigation.navigate('HomeNavigator');
      }, 10000);
      clearInputs();
    } catch (error) {
      showMessage({
        message: error.response.data,
        type: 'danger',
      });
    }
  };

  const clearInputs = () => {
    setContent('');
    contentTextRef.current.innerHTML = '';
    setTitle('');
    setStoryImage(null);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const headingComp = (tintColor, text) => {
    return <Text style={[styles.tib, {color: tintColor}]}>{text}</Text>;
  };

  const iconComp = (color, iconName) => {
    return <MaterialCommunityIcons name={iconName} size={18} color={color} />;
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={handleClose}
      style={styles.modalContainer}>
      <View
        style={[
          styles.modalBody,
          {
            backgroundColor:
              theme.name === 'light'
                ? theme.colors.background
                : theme.colors.background,
          },
        ]}>
        <View
          style={[styles.header, {borderColor: theme.colors.backgroundLight}]}>
          <TouchableOpacity onPress={closeHandle}>
            <Text style={[styles.textHeader, {color: theme.colors.text}]}>
              Close
            </Text>
          </TouchableOpacity>

          <RichToolbar
            editor={contentTextRef}
            selectedIconTint={theme.colors.secondary}
            iconTint={theme.colors.text}
            actions={[actions.undo, actions.redo]}
            style={[{backgroundColor: theme.colors.background}]}
            iconMap={{
              [actions.undo]: ({tintColor}) =>
                iconComp(tintColor, 'undo-variant'),
              [actions.redo]: ({tintColor}) =>
                iconComp(tintColor, 'redo-variant'),
            }}
          />

          <TouchableOpacity onPress={nextHandle}>
            <Text style={[styles.textHeader, {color: theme.colors.secondary}]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.richTextContainer}>
          <ScrollView>
            <TextInput
              ref={titleInputRef}
              style={[styles.title, {color: theme.colors.text}]}
              placeholder="title"
              value={title}
              multiline={true}
              placeholderTextColor={
                theme.name === 'light' ? 'lightgrey' : 'grey'
              }
              onChangeText={value => setTitle(value)}
              onFocus={() => setCursorColor(theme.colors.text)}
            />

            <RichEditor
              ref={contentTextRef}
              onChange={richTextHandle}
              placeholder="Write your cool content here :)"
              androidHardwareAccelerationDisabled={true}
              style={styles.richTextEditorStyle}
              editorStyle={{
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                placeholderColor: theme.colors.grey,
              }}
              initialHeight={250}
            />
          </ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <RichToolbar
              editor={contentTextRef}
              selectedIconTint={theme.colors.secondary}
              iconTint={theme.colors.text}
              actions={[
                actions.heading1,
                actions.heading2,
                actions.heading3,
                actions.setParagraph,
                actions.setBold,
                actions.setItalic,
                actions.insertLink,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.blockquote,
              ]}
              iconMap={{
                [actions.heading1]: ({tintColor}) =>
                  headingComp(tintColor, 'H1'),
                [actions.heading2]: ({tintColor}) =>
                  headingComp(tintColor, 'H2'),
                [actions.heading3]: ({tintColor}) =>
                  headingComp(tintColor, 'H3'),
                [actions.setParagraph]: ({tintColor}) =>
                  headingComp(tintColor, 'P'),
              }}
              iconSize={22}
              style={[
                styles.richTextToolbarStyle,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.backgroundLight,
                },
              ]}
            />
          </KeyboardAvoidingView>
        </View>
        <AddImageModal
          visible={modalVisible}
          handleClose={setModalVisible}
          theme={theme}
          storyImage={storyImage}
          setStoryImage={setStoryImage}
          submitHandle={submitHandle}
        />
      </View>
    </Modal>
  );
};

export default AddStoryModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalBody: {
    width: '100%',
    minHeight: '100%',
  },

  //header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  textHeader: {
    fontSize: 14,
    fontFamily: 'Comfortaa Regular',
  },

  richTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    flex: 1,
    padding: 10,
    fontFamily: 'Comfortaa SemiBold',
  },
  richTextEditorStyle: {
    fontFamily: 'Comfortaa Regular',
    fontSize: 40,
  },
  richTextToolbarStyle: {
    borderTopWidth: 2,
  },
  tib: {
    fontSize: 22,
  },
});
