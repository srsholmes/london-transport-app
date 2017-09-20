// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './app/store';
import MainStackRouter from './app/routers/main';
import NavigationBar from 'react-native-navbar';

const store = configureStore({});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <NavigationBar
            title={{ title: 'London Transport App' }}
          />
          <MainStackRouter/>
        </View>
      </Provider>
    );
  }
}
