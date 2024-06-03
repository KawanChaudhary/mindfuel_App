import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeProvider';

const SettingsHorizontalLine = () => {
    const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.line, {borderColor:theme.colors.backgroundLight}]} />
  );
};

export default SettingsHorizontalLine;


const styles = StyleSheet.create({
    line:{
        borderBottomWidth:1,
    },
});
