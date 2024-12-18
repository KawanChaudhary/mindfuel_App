import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import {TextInput} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomizeStatusBar from '../../Components/GeneralScreens/CustomizeStatusBar';
import Header from '../../Components/GeneralScreens/Header';
import {showMessage} from 'react-native-flash-message';
import {AuthContext} from '../../Contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import axios from '../../axiosInstance';
import Loader from '../../Components/GeneralScreens/Loader';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();

  const textInputRef = useRef(null);

  const setCursorColor = color => {
    if (textInputRef.current) {
      textInputRef.current.setNativeProps({cursorColor: color});
    }
  };

  const {theme} = useContext(ThemeContext);
  const {setUserConfig} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isRevealPass1, setIsRevealPass1] = useState(false);
  const [isRevealPass2, setIsRevealPass2] = useState(false);
  const [isRevealPass3, setIsRevealPass3] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setCursorColor(theme.colors.text);
  }, [theme]);

  const revealPassowrd = reveal => (reveal ? 'eye-off-outline' : 'eye-outline');

  const borderColor = () => (theme.name === 'light' ? 'grey' : 'lightgrey');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      showMessage({
        message: "Password don't match",
        type: 'danger',
      });
    } else {
      const config = await setUserConfig();
      try {
        setLoading(true);
        const {data} = await axios.put(
          '/user/changePassword',
          {newPassword, oldPassword},
          config,
        );
        showMessage({
          message: data.message,
          type: 'success',
        });
        navigation.navigate('profile');
      } catch (error) {
        showMessage({
          message: error.response.data.error,
          type: 'danger',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const disabledColor = 'grey';

  const isBtnDisable =
    oldPassword.length < 6 ||
    newPassword.length < 6 ||
    confirmPassword.length < 6;

  return (
    <Loader loading={loading}>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <CustomizeStatusBar />
        <Header title="Edit Profile" showBackButton={true} />

        <View style={styles.passwordContainer}>
          <View style={styles.passwords}>
            <View style={styles.passwordBox}>
              <Text style={[styles.passwordTitle, {color: theme.colors.text}]}>
                Old Password
              </Text>
              <View
                style={[styles.passwordInput, {borderColor: borderColor()}]}>
                <TextInput
                  ref={textInputRef}
                  style={[styles.passwordText, {color: theme.colors.text}]}
                  placeholder="Old Password"
                  placeholderTextColor={
                    theme.name === 'light' ? 'lightgrey' : 'grey'
                  }
                  secureTextEntry={!isRevealPass1}
                  onChangeText={value => setOldPassword(value)}
                />
                <Pressable onPress={() => setIsRevealPass1(!isRevealPass1)}>
                  <MaterialCommunityIcons
                    name={revealPassowrd(isRevealPass1)}
                    size={28}
                    color={theme.colors.text}
                  />
                </Pressable>
              </View>
            </View>

            {/* New Password */}
            <View style={styles.passwordBox}>
              <Text style={[styles.passwordTitle, {color: theme.colors.text}]}>
                New Password
              </Text>
              <View
                style={[styles.passwordInput, {borderColor: borderColor()}]}>
                <TextInput
                  ref={textInputRef}
                  style={[styles.passwordText, {color: theme.colors.text}]}
                  placeholder="New Password"
                  placeholderTextColor={
                    theme.name === 'light' ? 'lightgrey' : 'grey'
                  }
                  secureTextEntry={!isRevealPass2}
                  onChangeText={value => setNewPassword(value)}
                />
                <Pressable onPress={() => setIsRevealPass2(!isRevealPass2)}>
                  <MaterialCommunityIcons
                    name={revealPassowrd(isRevealPass2)}
                    size={28}
                    color={theme.colors.text}
                  />
                </Pressable>
              </View>
            </View>

            {/* Confirm New password */}

            <View style={styles.passwordBox}>
              <Text style={[styles.passwordTitle, {color: theme.colors.text}]}>
                Confirm Password
              </Text>
              <View
                style={[styles.passwordInput, {borderColor: borderColor()}]}>
                <TextInput
                  ref={textInputRef}
                  style={[styles.passwordText, {color: theme.colors.text}]}
                  placeholder="Confirm Password"
                  placeholderTextColor={
                    theme.name === 'light' ? 'lightgrey' : 'grey'
                  }
                  secureTextEntry={!isRevealPass3}
                  onChangeText={value => setConfirmPassword(value)}
                />
                <Pressable onPress={() => setIsRevealPass3(!isRevealPass3)}>
                  <MaterialCommunityIcons
                    name={revealPassowrd(isRevealPass3)}
                    size={28}
                    color={theme.colors.text}
                  />
                </Pressable>
              </View>
            </View>
          </View>

          <TouchableOpacity
            disabled={isBtnDisable}
            style={[
              styles.Btn,
              {
                borderColor: isBtnDisable
                  ? disabledColor
                  : theme.colors.secondary,
              },
            ]}
            onPress={handleSubmit}>
            <Text
              style={[
                styles.BtnText,
                {color: isBtnDisable ? disabledColor : theme.colors.secondary},
              ]}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Loader>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  passwordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  passwords: {
    width: '90%',
    gap: 20,
  },
  passwordBox: {
    gap: 5,
  },
  passwordTitle: {
    fontSize: 15,
    fontFamily: 'Comfortaa Bold',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  passwordText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Comfortaa SemiBold',
  },
  Btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 50,
  },
  BtnText: {
    fontSize: 16,
    fontFamily: 'Comfortaa Bold',
  },
});
