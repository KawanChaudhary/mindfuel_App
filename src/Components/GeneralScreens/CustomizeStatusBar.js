import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ThemeContext } from '../../Contexts/ThemeProvider';

const CustomizeStatusBar = () => {
    const {theme} = useContext(ThemeContext);

    const [barStyle, setBarStyle] = useState('dark-content');

    useEffect(()=>{

      if(theme.name === 'light'){
        setBarStyle('dark-content');
      }
      else{
        setBarStyle('light-content');
      }

    }, [theme]);

  return (
    <StatusBar barStyle={barStyle} backgroundColor={theme.colors.background} />
  );
};

export default CustomizeStatusBar;
