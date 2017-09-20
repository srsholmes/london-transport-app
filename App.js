// @flow
import React from 'react';
import { Provider } from 'react-redux';
import Transport from './app/containers/Transport';
import configureStore from './app/store';

const store = configureStore({});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Transport/>
      </Provider>
    );
  }
}
