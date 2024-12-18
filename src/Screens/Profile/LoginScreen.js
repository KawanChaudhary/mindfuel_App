import React, {useContext, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../Contexts/AuthContext';
import axios from '../../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import Loader from '../../Components/GeneralScreens/Loader';

export default function LoginScreen() {
  const {checkAuth} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [revealPassword, setRevealPassword] = useState(false);

  const showPassword = reveal => (reveal ? 'eye-off-outline' : 'eye-outline');

  const [emailicon, setEmailicon] = useState('email-outline');
  const [passwordIcon, setPasswordIcon] = useState('account-key-outline');
  const [focus, setFocus] = useState({emailFocus: false, passwordFocus: false});

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

  const handleFocusPassword = () => {
    setPasswordIcon('account-key');
    setCursorColor(theme.colors.text);
    setFocus({passwordFocus: true});
  };

  const handleBlurPassword = () => {
    setPasswordIcon('account-key-outline');
    setFocus({passwordFocus: false});
  };

  const validateEmail = checkEmail => {
    return /\S+@\S+\.\S+/.test(checkEmail);
  };

  const isFormDisabled = !validateEmail(email) || password.length < 6;

  const disabledColor = 'grey';

  const loginHandler = async () => {
    setLoading(true);
    try {
      const {data} = await axios.post('/auth/login', {email, password});
      await AsyncStorage.setItem('authToken', data.token);
      await checkAuth();
      navigation.reset({routes: [{name: 'ProfileNavigator'}]});
      navigation.navigate('HomeNavigator');
    } catch (err) {
      showMessage({
        message: err.response.data.error,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Loader loading={loading}>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        {/* <Text style={styles.logoName}>MIND FUEL</Text> */}

        <View style={styles.info}>
          <Text style={[styles.infoTop, {color: theme.colors.text}]}>
            Login to your account
          </Text>
          <Text style={[styles.infoBottom, {color: theme.colors.text}]}>
            Please Login Your Account, Thank You!
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
              ref={textInputRef}
              value={email}
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
          <View
            style={[
              styles.inputView,
              {
                borderColor: focus.passwordFocus
                  ? theme.colors.secondary
                  : theme.colors.backgroundLight,
              },
            ]}>
            <MaterialCommunityIcons
              name={passwordIcon}
              size={24}
              color={
                focus.passwordFocus ? theme.colors.secondary : theme.colors.text
              }
            />
            <TextInput
              ref={textInputRef}
              value={password}
              style={[styles.TextInput, {color: theme.colors.text}]}
              placeholder="6+ strong characters"
              placeholderTextColor={
                theme.name === 'light' ? 'lightgrey' : 'grey'
              }
              secureTextEntry={!revealPassword}
              onChangeText={value => setPassword(value)}
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
            />
            <Pressable onPress={() => setRevealPassword(!revealPassword)}>
              <MaterialCommunityIcons
                name={showPassword(revealPassword)}
                size={24}
                color={theme.colors.text}
              />
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('forgotpassword')}>
            <Text style={[styles.forgot_button, {color: theme.colors.primary}]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={isFormDisabled}
          onPress={loginHandler}
          style={[
            styles.loginBtn,
            {
              backgroundColor: isFormDisabled
                ? disabledColor
                : theme.colors.secondary,
            },
          ]}>
          <Text style={[styles.loginText]}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signUpBtn}>
          <Text style={[styles.signUpText, {color: theme.colors.text}]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={[styles.signUpText, {color: theme.colors.secondary}]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Loader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  info: {
    gap: 5,
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
  forgot_button: {
    height: 30,
    fontFamily: 'Comfortaa Bold',
  },
  loginBtn: {
    width: '80%',
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
});
