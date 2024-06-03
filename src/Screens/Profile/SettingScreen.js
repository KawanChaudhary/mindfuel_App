import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../Contexts/ThemeProvider';
import CustomizeStatusBar from '../../Components/GeneralScreens/CustomizeStatusBar';
import Header from '../../Components/GeneralScreens/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsHorizontalLine from '../../Components/ProfileScreenComps/SettingsHorizontalLine';
import { useNavigation } from '@react-navigation/native';
import ReactNativeSegmentedControlTab from 'react-native-segmented-control-tab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Contexts/AuthContext';

const SettingScreen = () => {
    const { checkAuth } = useContext(AuthContext);
    const { theme, getUserTheme, setUserTheme } = useContext(ThemeContext);
    const [choosenTheme, setChoosenTheme] = useState(0);

    const themeValue = useCallback(async () => {
        const userChoice = await getUserTheme();
        if (userChoice === 'system') {
            setChoosenTheme(0);
        }
        else if (userChoice === 'dark') {
            setChoosenTheme(2);
        }
        else {
            setChoosenTheme(1);
        }
    }, [getUserTheme]);

    useEffect(() => {

        themeValue();

    }, [themeValue]);

    const chooseTheme = async (val) => {
        setChoosenTheme(val);

        if (val === 0) {
            await setUserTheme('system');
        }
        else if (val === 1) {
            await setUserTheme('light');
        }
        else {
            await setUserTheme('dark');
        }
    };

    const signOut = async () => {
        await AsyncStorage.removeItem('authToken');
        await checkAuth();
        navigation.reset({ routes: [{ name: 'ProfileNavigator' }] });
    };

    const navigation = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.backgroundLight }]}>
            <CustomizeStatusBar />
            <ScrollView>

                <Header title={'Settings'} showBackButton={true} />


                {/* setting collection heading */}
                <View style={styles.settingHeading}>
                    <Text style={[styles.headingText, { color: theme.colors.text }]}>Account</Text>
                </View>

                <SettingsHorizontalLine />

                {/* setting items */}

                <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.background }]} onPress={() => navigation.navigate('editprofile')}>
                    <Text style={[styles.settingItemText, { color: theme.colors.text }]}>Edit Profile</Text>
                </TouchableOpacity>
                <SettingsHorizontalLine />

                <View style={[styles.settingItemAppearance, { backgroundColor: theme.colors.background }]}>
                    <Text style={[styles.settingItemText, { color: theme.colors.text }]}>Appearance</Text>

                    <ReactNativeSegmentedControlTab
                        values={['System', 'Light', 'Dark']}
                        selectedIndex={choosenTheme}
                        onTabPress={chooseTheme}
                        tabsContainerStyle={[styles.segBtnContainer]}
                        tabStyle={[styles.segBtnTabStyle, { borderColor: theme.colors.background, backgroundColor: theme.colors.grey }]}
                        tabTextStyle={[styles.segBtnTabText, { color: theme.colors.text }]}
                        activeTabStyle={[styles.segBtnActiveTabStyle, { backgroundColor: theme.colors.background, borderColor: theme.colors.grey }]}
                        activeTabTextStyle={[styles.segBtnActiveTabTextStyle, { color: theme.colors.text }]}
                    />
                </View>
                <SettingsHorizontalLine />

                {/* setting collection heading */}
                <View style={styles.settingHeading}>
                    <Text style={[styles.headingText, { color: theme.colors.text }]}>About Mind fuel</Text>
                </View>

                <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.background }]}>
                    <Text style={[styles.settingItemText, { color: theme.colors.text }]}>Help</Text>
                </TouchableOpacity>
                <SettingsHorizontalLine />

                <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.background }]}>
                    <Text style={[styles.settingItemText, { color: theme.colors.text }]}>Terms of service</Text>
                </TouchableOpacity>
                <SettingsHorizontalLine />

                <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.background }]}>
                    <Text style={[styles.settingItemText, { color: theme.colors.text }]}>Privacy Policy</Text>
                </TouchableOpacity>
                <SettingsHorizontalLine />

                <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.background }]}>
                    <Text style={[styles.settingItemText, { color: theme.colors.text }]}>Rate on the Play Store</Text>
                </TouchableOpacity>
                <SettingsHorizontalLine />

                {/* setting collection heading */}
                <View style={styles.settingHeading}>
                    <Text style={[styles.headingText, { color: theme.colors.text }]}>App Control</Text>
                </View>

                <SettingsHorizontalLine />

                <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.background }]} onPress={signOut}>
                    <Text style={[styles.settingItemText, { color: theme.colors.text }]}>Sign Out</Text>
                </TouchableOpacity>
                <SettingsHorizontalLine />

                {/* setting collection heading */}
                <View style={styles.settingHeading}>
                    <Text style={[styles.versionText, { color: theme.colors.text }]}>Version 1.0</Text>
                </View>

                <SettingsHorizontalLine />


            </ScrollView>
        </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settingHeading: {
        marginTop: 20,
        paddingLeft: 20,
        marginBottom: 15,
    },
    headingText: {
        fontSize: 20,
        fontFamily: 'Comfortaa Bold',
    },
    settingItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    settingItemText: {
        fontSize: 16,
        fontFamily: 'Comfortaa Regular',
    },
    settingItemAppearance: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 10,
        paddingVertical: 10,
    },
    segmentedBtn: {
        marginHorizontal: 0,
    },
    versionText: {
        fontSize: 16,
        fontFamily: 'Comfortaa Bold',
    },
    segBtnContainer: {
        width: '60%',
    },
    segBtnTabStyle: {
        width: '30%',
    },
    segBtnTabText: {
        fontFamily: 'Comfortaa Regular',
    },
    segBtnActiveTabStyle: {
        margin: 1,
        borderWidth: 1,
    },
    segBtnActiveTabTextStyle: {
        fontFamily: 'Comfortaa Bold',
    },
});
