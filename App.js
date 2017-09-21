// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './app/store';
import AppWithNavigationState from './app/routers/main';

const store = configureStore({});


export default class App extends Component {
  render() {
    console.log('App render');
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState/>
        </View>
      </Provider>
    );
  }
}
