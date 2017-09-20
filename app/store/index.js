import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import createReducer from '../reducers';
import storage from '../utils/storage'

const composeEnhancers = composeWithDevTools({
  realtime: true,
  port: 5678,
  hostname: 'localhost',
});

export default function configureStore(initialState = {}): any {
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
      //storage(), // Saves the state to the phone, on every action. Useful for starting the app in the same state as before if needed.
    ),
  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
