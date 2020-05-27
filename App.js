/**
 * 
 * npm install redux --save
 * npm install react-redux --save
 */
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';

const store = configureStore();

export default function App() {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </Fragment>
  );
}

