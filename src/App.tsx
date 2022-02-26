/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux';
import {MainNavigation} from './navigation';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
