/* @flow */

import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import createReducer from '../reducers';
import storage from '../middleware/storage'
import promise from '../middleware/promise';
import Tracking from '../middleware/tracking';
import type { Store } from '../types/Store';

const composeEnhancers = composeWithDevTools({
  realtime: true,
  port: 5678,
  hostname: 'localhost',
});

export default function configureStore(initialState: {} = {}): Store {
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(thunk, promise, Tracking.trackingMiddleware),
      storage(), // Saves the state to the phone, on every action. Useful for starting the app in the same state as before if needed.
    ),
  );

  if (module.hot) {
    /* $FlowFixMe */
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
