import React, {useContext} from 'react';
import LoggedUserNavigator from './LoggedUserNavigator';
import NotLoggedNavigator from './NotLoggedNavigator';
import {AuthContext} from '../../Contexts/AuthContext';

const ProfileNavigator = () => {
  const {auth} = useContext(AuthContext);

  return auth ? <LoggedUserNavigator /> : <NotLoggedNavigator />;
};

export default ProfileNavigator;
