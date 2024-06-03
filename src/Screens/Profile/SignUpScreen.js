import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { ThemeContext } from '../../Contexts/ThemeProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from '../../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';


const SignUpScreen = () => {

    const { checkAuth } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [revealPassword, setRevealPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const showPassword = (reveal) => reveal ? 'eye-off-outline' : 'eye-outline';

    const [focus, setFocus] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const validateEmail = (checkEmail) => {
        return /\S+@\S+\.\S+/.test(checkEmail);
    };

    const isFormDisabled = password.length < 6 || confirmPassword < 6;

    const disabledColor = 'grey';

    const signupHandler = async () => {

        if (!validateEmail(email)) {
            showMessage({
                message: 'Invalid email address',
                type: 'danger',
            });
        }
        else if (password !== confirmPassword) {
            showMessage({
                message: "Password doesn't match",
                type: 'danger',
            });
        }
        else {


            try {
                const { data } = await axios.post('/auth/register', { username, email, password });
                await AsyncStorage.setItem('authToken', data.token);
                await checkAuth();
                navigation.reset({ routes: [{ name: 'ProfileNavigator' }] });
                navigation.navigate('HomeNavigator');
            }
            catch (err) {
                showMessage({
                    message: err.response.data.error,
                    type: 'danger',
                });
            }
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            <View style={styles.info}>
                <Text style={[styles.infoTop, { color: theme.colors.text }]}>Welcome to MIND FUEL</Text>
                <Text style={[styles.infoBottom, { color: theme.colors.text }]}>
                    It's easy and free to post your thinking on any topic and connect with thounsands of readers.
                </Text>
            </View>

            <View>

                {/* username */}

                <View style={[styles.inputView, { borderColor: focus.username ? theme.colors.secondary : theme.colors.backgroundLight }]}>
                    <MaterialCommunityIcons name={focus.username ? 'account' : 'account-outline'} size={24}
                        color={focus.username ? theme.colors.secondary : theme.colors.text} />
                    <TextInput
                        style={[styles.TextInput, { color: theme.colors.text }]}
                        value={username}
                        placeholder="Enter Username"
                        placeholderTextColor={theme.name === 'light' ? 'lightgrey' : 'grey'}
                        onChangeText={(value) => setUsername(value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={() => setFocus({ username: true })}
                        onBlur={() => setFocus({ username: false })}
                    />
                </View>

                {/* Email */}

                <View style={[styles.inputView, { borderColor: focus.email ? theme.colors.secondary : theme.colors.backgroundLight }]}>
                    <MaterialCommunityIcons name={focus.email ? 'email' : 'email-outline'} size={24}
                        color={focus.email ? theme.colors.secondary : theme.colors.text} />
                    <TextInput
                        style={[styles.TextInput, { color: theme.colors.text }]}
                        value={email}
                        placeholder="example@gmail.com"
                        placeholderTextColor={theme.name === 'light' ? 'lightgrey' : 'grey'}
                        onChangeText={(value) => setEmail(value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={() => setFocus({ email: true })}
                        onBlur={() => setFocus({ email: false })}
                    />
                </View>

                {/* Password */}

                <View style={[styles.inputView, { borderColor: focus.password ? theme.colors.secondary : theme.colors.backgroundLight }]}>
                    <Ionicons name={focus.password ? 'lock-open' : 'lock-open-outline'} size={24}
                        color={focus.password ? theme.colors.secondary : theme.colors.text} />
                    <TextInput
                        style={[styles.TextInput, { color: theme.colors.text }]}
                        value={password}
                        placeholder="6+ strong character"
                        placeholderTextColor={theme.name === 'light' ? 'lightgrey' : 'grey'}
                        secureTextEntry={!revealPassword.password}
                        onChangeText={(value) => setPassword(value)}
                        onFocus={() => setFocus({ password: true })}
                        onBlur={() => setFocus({ password: false })}
                    />
                    <Pressable onPress={() => setRevealPassword({ password: !revealPassword.password, confirmPassword: revealPassword.confirmPassword })}>

                        <MaterialCommunityIcons name={showPassword(revealPassword.password)} size={24} color={theme.colors.text} />
                    </Pressable>
                </View>

                {/* Confirm Password */}

                <View style={[styles.inputView, { borderColor: focus.confirmPassword ? theme.colors.secondary : theme.colors.backgroundLight }]}>
                    <Ionicons name={focus.confirmPassword ? 'lock-closed' : 'lock-closed-outline'} size={24}
                        color={focus.confirmPassword ? theme.colors.secondary : theme.colors.text} />
                    <TextInput
                        style={[styles.TextInput, { color: theme.colors.text }]}
                        value={confirmPassword}
                        placeholder="Confirm Passowrd"
                        placeholderTextColor={theme.name === 'light' ? 'lightgrey' : 'grey'}
                        secureTextEntry={!revealPassword.confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                        onFocus={() => setFocus({ confirmPassword: true })}
                        onBlur={() => setFocus({ confirmPassword: false })}
                    />
                    <Pressable onPress={() => setRevealPassword({ confirmPassword: !revealPassword.confirmPassword, password: revealPassword.password })}>

                        <MaterialCommunityIcons name={showPassword(revealPassword.confirmPassword)} size={24} color={theme.colors.text} />
                    </Pressable>
                </View>
            </View>

            <TouchableOpacity disabled={isFormDisabled} onPress={signupHandler}
                style={[styles.signupBtn, { backgroundColor: isFormDisabled ? disabledColor : theme.colors.secondary }]} >
                <Text style={[styles.signupText]}>Register</Text>
            </TouchableOpacity>

            <View style={styles.signUpBtn}>
                <Text style={[styles.login, { color: theme.colors.text }]}>Have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={[styles.login, { color: theme.colors.secondary }]}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 1,
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
        width: '90%',
        height: 45,
        marginBottom: 20,
        borderBottomWidth: 2,
        paddingHorizontal: 5,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        fontFamily: 'Comfortaa SemiBold',
    },
    signupBtn: {
        width: '80%',
        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Comfortaa Bold',
        letterSpacing: 1,
    },
    signUpBtn: {
        flexDirection: 'row',
        gap: 10,
    },
    login: {
        fontSize: 14,
        fontFamily: 'Comfortaa Bold',
    },
});
