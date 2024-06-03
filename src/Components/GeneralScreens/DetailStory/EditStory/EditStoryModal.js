import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-gesture-handler';
import AddImageModal from '../../../AddStory/AddImageModal';
import { showMessage } from 'react-native-flash-message';
import { axiosFormInstance } from '../../../../axiosInstance';

const EditStoryModal = ({ visible, closeModal, story, theme, setUserConfig, getDetailStory }) => {


    const contentTextRef = useRef();
    const titleInputRef = useRef(null);

    const [title, setTitle] = useState(story.title);
    const [content, setContent] = useState(story.content);
    const [previousStoryImage, setPreviousStoryImage] = useState(story.image);
    const [storyImage, setStoryImage] = useState(story.image);

    // Modal
    const [modalVisible, setModalVisible] = useState(false);

    const handleClose = () => closeModal(false);

    const richTextHandle = (contentText) => {
        if (contentText) {
            setContent(contentText);
        } else {
            setContent('');
        }
    };

    const setCursorColor = (color) => {
        if (titleInputRef.current) {
            titleInputRef.current.setNativeProps({ cursorColor: color });
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
                { cancelable: true }
            );
        }
        else {
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
        formdata.append('previousImage', previousStoryImage);

        try {
            const config = await setUserConfig();

            await axiosFormInstance.put(`/story/${story.slug}/edit`, formdata, config);

            getDetailStory();
            handleClose();

            setTimeout(() => {

                showMessage({
                    message: 'Changes made successfully.',
                    type: 'success',
                });
            }, 1000);

            clearInputs();

        }
        catch (error) {
            showMessage({
                message: error.response.data.error,
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
        return <Text style={[styles.tib, { color: tintColor }]}>{text}</Text>;
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
            <View style={[styles.modalBody, { backgroundColor: theme.name === 'light' ? theme.colors.background : theme.colors.background }]}>

                {/* header */}

                <View style={[styles.header, { borderColor: theme.colors.backgroundLight }]}>
                    <TouchableOpacity onPress={handleClose}>
                        <Text style={[styles.textHeader, { color: theme.colors.text }]}>Close</Text>
                    </TouchableOpacity>

                    <RichToolbar
                        editor={contentTextRef}
                        selectedIconTint={theme.colors.secondary}
                        iconTint={theme.colors.text}
                        actions={[
                            actions.undo,
                            actions.redo,
                        ]}
                        style={[{ backgroundColor: theme.colors.background }]}
                        iconMap={{
                            [actions.undo]: ({ tintColor }) => iconComp(tintColor, 'undo-variant'),
                            [actions.redo]: ({ tintColor }) => iconComp(tintColor, 'redo-variant'),
                        }}
                    />

                    <TouchableOpacity onPress={nextHandle}>
                        <Text style={[styles.textHeader, { color: theme.colors.secondary }]}>Next</Text>
                    </TouchableOpacity>

                </View>

                {/* Editor */}

                <View style={styles.richTextContainer}>

                    <ScrollView>

                        <TextInput
                            ref={titleInputRef}
                            style={[styles.title, { color: theme.colors.text }]}
                            placeholder="title"
                            multiline={true}
                            value={title}
                            placeholderTextColor={theme.name === 'light' ? 'lightgrey' : 'grey'}
                            onChangeText={(value) => setTitle(value)}
                            onFocus={() => setCursorColor(theme.colors.text)}
                        />


                        <RichEditor
                            ref={contentTextRef}
                            onChange={richTextHandle}
                            initialContentHTML={content}
                            placeholder="Write your cool content here :)"
                            androidHardwareAccelerationDisabled={true}
                            style={styles.richTextEditorStyle}
                            editorStyle={{
                                backgroundColor: theme.colors.background, color: theme.colors.text,
                                placeholderColor: theme.colors.grey,
                            }}
                            initialHeight={250}
                        />
                    </ScrollView>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

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
                                [actions.heading1]: ({ tintColor }) => headingComp(tintColor, 'H1'),
                                [actions.heading2]: ({ tintColor }) => headingComp(tintColor, 'H2'),
                                [actions.heading3]: ({ tintColor }) => headingComp(tintColor, 'H3'),
                                [actions.setParagraph]: ({ tintColor }) => headingComp(tintColor, 'P'),
                            }}
                            iconSize={22}
                            style={[styles.richTextToolbarStyle, { backgroundColor: theme.colors.background, borderColor: theme.colors.backgroundLight }]}
                        />
                    </KeyboardAvoidingView>
                </View>

                <AddImageModal visible={modalVisible} handleClose={setModalVisible} theme={theme} storyImage={storyImage}
                    setStoryImage={setStoryImage} submitHandle={submitHandle} />

            </View>
        </Modal>
    );
};

export default EditStoryModal;

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

    //Editor

    richTextContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 25,
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: 'Comfortaa Bold',
    },
    richTextEditorStyle: {
        fontFamily: 'Comfortaa Regular',
    },
    richTextToolbarStyle: {
        borderTopWidth: 2,
    },
    tib: {
        fontSize: 22,
    },

});
