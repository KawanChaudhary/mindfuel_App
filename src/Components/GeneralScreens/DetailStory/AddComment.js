import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {defaultImage} from '../../../Data/default';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddComment = ({theme, handleSubmit}) => {
  const [comment, setComment] = useState('');

  const handleInputChange = text => {
    setComment(text);
  };

  const submitComment = async () => {
    await handleSubmit(comment);
    setComment('');
  };

  const isCommentReady = comment.trim() === '';

  return (
    <View
      style={[
        styles.addCommentContainer,
        {
          backgroundColor:
            theme.name === 'light'
              ? theme.colors.background
              : theme.colors.backgroundLight,
        },
      ]}>
      <View style={styles.avatar}>
        <Image source={{uri: defaultImage}} style={styles.image} />
      </View>

      <View style={styles.addCommentContent}>
        <TextInput
          selectionColor={theme.colors.text}
          placeholder="Add a comment"
          value={comment}
          onChangeText={handleInputChange}
          multiline={true}
          placeholderTextColor={theme.colors.text}
          style={[
            styles.input,
            {
              backgroundColor:
                theme.name === 'light'
                  ? theme.colors.background
                  : theme.colors.backgroundLight,
              color: theme.colors.text,
            },
          ]}
        />
      </View>

      <TouchableOpacity
        disabled={isCommentReady}
        style={[styles.send, {backgroundColor: theme.colors.primary}]}
        onPress={submitComment}>
        <Ionicons name="send-sharp" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 0.2,
    paddingVertical: 15,
    borderColor: 'grey',
    paddingHorizontal: 20,
    zIndex: 100,
    gap: 15,
  },
  addCommentContent: {
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 25,
    padding: 10,
    minWidth: '70%',
    fontFamily: 'Comfortaa SemiBold',
  },
  send: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
