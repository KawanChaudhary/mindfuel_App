import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import {AuthContext} from '../../Contexts/AuthContext';
import CustomizeStatusBar from '../../Components/GeneralScreens/CustomizeStatusBar';
import Header from '../../Components/GeneralScreens/Header';
import SettingsHorizontalLine from '../../Components/ProfileScreenComps/SettingsHorizontalLine';
import ReactNativeSegmentedControlTab from 'react-native-segmented-control-tab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SettingScreen = () => {
  const {theme, setUserTheme} = useContext(ThemeContext);
  const {checkAuth} = useContext(AuthContext);
  const navigation = useNavigation();

  const [choosenTheme, setChoosenTheme] = useState(0);

  const initializeTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      switch (storedTheme) {
        case 'dark':
          setChoosenTheme(2);
          break;
        case 'light':
          setChoosenTheme(1);
          break;
        default:
          setChoosenTheme(0);
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  };

  useEffect(() => {
    initializeTheme();
  }, []);

  const chooseTheme = async index => {
    setChoosenTheme(index);
    try {
      const themeMapping = ['system', 'light', 'dark'];
      const selectedTheme = themeMapping[index];
      await setUserTheme(selectedTheme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await checkAuth();
      navigation.reset({routes: [{name: 'ProfileNavigator'}]});
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.colors.backgroundLight},
      ]}>
      <CustomizeStatusBar />
      <ScrollView>
        <Header title="Settings" showBackButton />

        {/* Account Section */}
        <SectionHeader title="Account" />
        <SettingsHorizontalLine />
        <SettingItem
          title="Edit Profile"
          onPress={() => navigation.navigate('editprofile')}
          backgroundColor={theme.colors.background}
          textColor={theme.colors.text}
        />

        {/* Appearance Section */}
        <SectionHeader title="Appearance" />
        <SettingsHorizontalLine />
        <View
          style={[
            styles.settingItemAppearance,
            {backgroundColor: theme.colors.background},
          ]}>
          <Text style={[styles.settingItemText, {color: theme.colors.text}]}>
            Appearance
          </Text>
          <ReactNativeSegmentedControlTab
            values={['System', 'Light', 'Dark']}
            selectedIndex={choosenTheme}
            onTabPress={chooseTheme}
            tabsContainerStyle={[styles.segBtnContainer]}
            tabStyle={[
              styles.segBtnTabStyle,
              {
                borderColor: theme.colors.background,
                backgroundColor: theme.colors.grey,
              },
            ]}
            tabTextStyle={[styles.segBtnTabText, {color: theme.colors.text}]}
            activeTabStyle={[
              styles.segBtnActiveTabStyle,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.grey,
              },
            ]}
            activeTabTextStyle={[
              styles.segBtnActiveTabTextStyle,
              {color: theme.colors.text},
            ]}
          />
        </View>

        {/* About Section */}
        <SectionHeader title="About Mind Fuel" />
        <SettingItem
          title="Help"
          backgroundColor={theme.colors.background}
          textColor={theme.colors.text}
        />
        <SettingItem
          title="Terms of Service"
          backgroundColor={theme.colors.background}
          textColor={theme.colors.text}
        />
        <SettingItem
          title="Privacy Policy"
          backgroundColor={theme.colors.background}
          textColor={theme.colors.text}
        />
        <SettingItem
          title="Rate on the Play Store"
          backgroundColor={theme.colors.background}
          textColor={theme.colors.text}
        />

        {/* App Control Section */}
        <SectionHeader title="App Control" />
        <SettingItem
          title="Sign Out"
          onPress={signOut}
          backgroundColor={theme.colors.background}
          textColor={theme.colors.text}
        />

        {/* App Version */}
        <SectionHeader title="Version 1.0" isVersion />
      </ScrollView>
    </View>
  );
};

const SectionHeader = ({title, isVersion}) => (
  <View style={styles.settingHeading}>
    <Text
      style={[
        isVersion ? styles.versionText : styles.headingText,
        {color: useContext(ThemeContext).theme.colors.text},
      ]}>
      {title}
    </Text>
  </View>
);

const SettingItem = ({title, onPress, backgroundColor, textColor}) => (
  <>
    <TouchableOpacity
      style={[styles.settingItem, {backgroundColor}]}
      onPress={onPress}>
      <Text style={[styles.settingItemText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
    <SettingsHorizontalLine />
  </>
);

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
  versionText: {
    fontSize: 16,
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

export default SettingScreen;
