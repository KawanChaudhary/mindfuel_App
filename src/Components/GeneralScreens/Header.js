import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../Contexts/ThemeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({title, showBackButton}) => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={25}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, {color: theme.colors.text}]}>{title}</Text>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 45,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Comfortaa Bold',
    paddingBottom: 5,
  },
});

export default Header;
