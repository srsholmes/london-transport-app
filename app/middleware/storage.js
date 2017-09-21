import { AsyncStorage } from 'react-native';

const pick = (obj, arr) => {
  return Object.keys(obj).filter(x => arr.includes(x)).reduce((acc, curr) => ({ ...acc, [curr]: obj[ curr ] }), {});
};

const saveState = key => async state => {
  const stateToSave = pick(state, [ 'favouriteLines' ]);
  console.log('*************');
  console.log(stateToSave);
  await AsyncStorage.setItem(key, JSON.stringify(stateToSave));
};

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(async () => {
      const state = store.getState();
      console.log('STATE', state);
      const saver = saveState('TransportApp');
      saver(state);
    });
    return store;
  };
}
