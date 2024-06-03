import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

const AuthContextProvider = props => {

  const [activeUser, setActiveUser] = useState({});

  const setUserConfig = async () => {
    const userConfig = {
      headers: {
        authorization: `Bearer ${await AsyncStorage.getItem('authToken')}`,
      },
    };
    return userConfig;
  };

  const [auth, setAuth] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = await AsyncStorage.getItem('authToken');
    const bool = token != null ? true : false;
    if(!auth){
      setActiveUser({});
    }
    setAuth(bool);
  }, [auth]);

  const controlAuth = useCallback(async () => {
    const config = await setUserConfig();

    // console.log('Token:', await AsyncStorage.getItem('authToken'));
    // console.log(config);

    try {
      const { data } = await axios.get('/auth/private', config);
      setActiveUser(data.user);
    }
    catch (error) {
      await AsyncStorage.removeItem('authToken');
      setAuth(false);
      setActiveUser({});
    }
  }, []);

  useEffect(() => {
    checkAuth();
    if (auth) {
      controlAuth();
    }

  }, [checkAuth, auth, controlAuth]);

  return (
    <AuthContext.Provider value={{ activeUser, setUserConfig, auth, checkAuth, controlAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
