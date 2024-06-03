import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeProvider';

const HorizontalLine = () => {
    const {theme} = useContext(ThemeContext);
  return (
    <View style={[styles.line,{borderColor:theme.colors.backgroundLight}]} />
  );
};

export default HorizontalLine;

const styles = StyleSheet.create({
    line:{
        borderBottomWidth:2,
        marginVertical:10,
    },
});
