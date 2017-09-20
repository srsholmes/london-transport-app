import { AsyncStorage } from 'react-native';

const saveState = key => async state => await AsyncStorage.setItem(key, state);

const getState = async key => await AsyncStorage.getItem('AuthToken');

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(async () => {
      const state = store.getState();
      const saver = await saveState('TransportApp');
      saver(state);
    });
    return store;
  };
}
