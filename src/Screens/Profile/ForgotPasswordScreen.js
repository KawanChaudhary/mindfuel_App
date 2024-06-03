import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../Contexts/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPasswordScreen = () => {

    const {theme} = useContext(ThemeContext);
    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const [focus, setFocus] = useState(false);

    const validateEmail = (checkEmail) => {
        return /\S+@\S+\.\S+/.test(checkEmail);
    };

    const disabledColor = 'grey';

    const loginHandler = async () => {

        try {
            const { data } = await axiosInstance.post('/auth/forgotpassword', { email });
            showMessage({
                message: data.message,
                type: 'danger',
                animationDuration:300,
            });
        } catch (err) {
            showMessage({
                message: err.response.data.error,
                type: 'danger',
            });
        }
    };

    const isFormDisabled = !validateEmail();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            {/* <Text style={styles.logoName}>MIND FUEL</Text> */}

            <View style={styles.info}>
                <Text style={[styles.infoTop, { color: theme.colors.text }]}>Login to your account</Text>
                <Text style={[styles.infoBottom, { color: theme.colors.text }]}>
                    Please Login Your Account, Thank You!
                </Text>
            </View>

            <View>


                <View style={[styles.inputView, { borderColor: focus.emailFocus ? theme.colors.secondary : theme.colors.backgroundLight }]}>
                    <MaterialCommunityIcons name={emailicon} size={24} color={focus.emailFocus ? theme.colors.secondary : theme.colors.text} />
                    <TextInput
                        style={[styles.TextInput, { color: theme.colors.text }]}
                        placeholder="example@gmail.com"
                        placeholderTextColor={theme.name === 'light' ? 'lightgrey' : 'grey'}
                        onChangeText={(value) => setEmail(value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={handleFocusEmail}
                        onBlur={handleBlurEmail}
                    />
                </View>
            </View>

            <TouchableOpacity disabled={isFormDisabled} onPress={loginHandler}
                style={[styles.loginBtn, { backgroundColor: isFormDisabled ? disabledColor : theme.colors.secondary }]} >
                <Text style={[styles.loginText]}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signUpBtn}>
                <Text style={[styles.signUpText, { color: theme.colors.text }]}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={[styles.signUpText, { color: theme.colors.secondary }]}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});
