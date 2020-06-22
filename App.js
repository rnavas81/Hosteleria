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

// import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <StatusBar barStyle="light-content" />
          <AppNavigator />
      </Fragment>
    </Provider>
  );
}

