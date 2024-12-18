import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../Components/GeneralScreens/Loader';

const ForgotPasswordScreen = () => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailicon, setEmailicon] = useState('email-outline');
  const [focus, setFocus] = useState(false);

  const validateEmail = checkEmail => {
    return /\S+@\S+\.\S+/.test(checkEmail);
  };

  const disabledColor = 'grey';

  const textInputRef = useRef(null);

  const setCursorColor = color => {
    if (textInputRef.current) {
      textInputRef.current.setNativeProps({cursorColor: color});
    }
  };

  const handleFocusEmail = () => {
    setEmailicon('email');
    setCursorColor(theme.colors.text);
    setFocus({emailFocus: true});
  };

  const handleBlurEmail = () => {
    setEmailicon('email-outline');
    setFocus({emailFocus: false});
  };

  const forgotpasswordHandler = async () => {
    try {
      setLoading(true);
      const {data} = await axiosInstance.post('/auth/forgotpassword', {email});
      showMessage({
        message: data.message,
        type: 'success',
        animationDuration: 600,
      });
      setTimeout(() => navigation.navigate('login'), 2000);
    } catch (err) {
      showMessage({
        message: err.response.data.error,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormDisabled = !validateEmail(email);

  return (
    <Loader loading={loading}>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={styles.info}>
          <Text style={[styles.infoTop, {color: theme.colors.text}]}>
            Forgot Password
          </Text>
          <Text style={[styles.infoBottom, {color: theme.colors.text}]}>
            Please enter the email address you register your account with.
          </Text>
          <Text style={[styles.infoBottom, {color: theme.colors.text}]}>
            We will send you reset password link to this email.
          </Text>
        </View>

        <View>
          <View
            style={[
              styles.inputView,
              {
                borderColor: focus.emailFocus
                  ? theme.colors.secondary
                  : theme.colors.backgroundLight,
              },
            ]}>
            <MaterialCommunityIcons
              name={emailicon}
              size={24}
              color={
                focus.emailFocus ? theme.colors.secondary : theme.colors.text
              }
            />
            <TextInput
              style={[styles.TextInput, {color: theme.colors.text}]}
              placeholder="example@gmail.com"
              placeholderTextColor={
                theme.name === 'light' ? 'lightgrey' : 'grey'
              }
              onChangeText={value => setEmail(value)}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={handleFocusEmail}
              onBlur={handleBlurEmail}
            />
          </View>
        </View>
        <View style={styles.parentContainer}>
          <TouchableOpacity
            disabled={isFormDisabled}
            onPress={forgotpasswordHandler}
            style={[
              styles.loginBtn,
              {
                backgroundColor: isFormDisabled
                  ? disabledColor
                  : theme.colors.secondary,
              },
            ]}>
            <Text style={[styles.loginText]}>Send Email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpBtn}>
          <Text style={[styles.signUpText, {color: theme.colors.text}]}>
            Have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={[styles.signUpText, {color: theme.colors.secondary}]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Loader>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  info: {
    gap: 5,
    width: '90%',
  },
  infoTop: {
    fontSize: 30,
    fontFamily: 'RubikBubbles-Regular',
  },
  infoBottom: {
    fontSize: 12,
    fontFamily: 'Comfortaa SemiBold',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
    height: 45,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontFamily: 'Comfortaa SemiBold',
  },
  parentContainer: {
    width: '80%',
  },
  loginBtn: {
    width: '100%',
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Comfortaa Bold',
    letterSpacing: 1,
  },
  signUpBtn: {
    flexDirection: 'row',
    gap: 10,
  },
  signUpText: {
    fontSize: 14,
    fontFamily: 'Comfortaa Bold',
  },
  forgot_button: {
    height: 30,
    fontFamily: 'Comfortaa Bold',
  },
});
