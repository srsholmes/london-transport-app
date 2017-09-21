// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './app/store';
import AppWithNavigationState from './app/routers/main';
import { AsyncStorage } from 'react-native';
import { setInitialFavourites } from './app/actions';
import Tracking from './app/middleware/tracking';

const store = configureStore({});

// Init the tracking.
Tracking.init(store);

export default class App extends Component {
  async componentWillMount() {
    const res = await AsyncStorage.getItem('TransportApp');
    const { favouriteLines } = JSON.parse(res);
    favouriteLines.length && store.dispatch(setInitialFavourites(favouriteLines))
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState/>
        </View>
      </Provider>
    );
  }
}
