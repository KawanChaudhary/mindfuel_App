import React from 'react';
import {Provider} from 'react-redux';
import RootNavigator from './src/Navigators/RootNavigator';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import store from './src/Redux/store';

function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
