import React from 'react';
import RootNavigator from './src/Navigators/RootNavigator';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import 'react-native-devsettings/withAsyncStorage';

function App() {
  return <RootNavigator />;
}

export default App;
