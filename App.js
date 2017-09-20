// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './app/store';
import AppWithNavigationState from './app/routers/main';
import NavigationBar from 'react-native-navbar';

const store = configureStore({});

const navigateHandler = dir => ({
  title: dir,
  handler: () => {
    const state = store.getState();
    console.log('State', state);
    // TODO: Do the map here on the routes to hide / show the different nav bar buttons.
    alert('hello!');
  },
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <NavigationBar
            title={{ title: 'London Transport App' }}
            rightButton={navigateHandler('Next')}
            leftButton={navigateHandler('Previous')}
          />
          <AppWithNavigationState/>
        </View>
      </Provider>
    );
  }
}
