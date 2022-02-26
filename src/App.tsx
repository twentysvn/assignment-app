/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {Provider} from 'react-redux';
import {ApolloClientConfig} from './config';
import {store} from './redux';
import {MainNavigation} from './navigation';

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={ApolloClientConfig}>
        <MainNavigation />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
