import { combineReducers } from 'redux';
import hello from './hello';

export const sortReducers = red =>
  Object.keys(red).sort().reduce((acc, r) => ({ ...acc, [r]: red[r] }), {}); // Sort reducers alphabetically for dev tools.

const reducers = {
  hello,
};

export default function createReducer(asyncReducers) {
  return combineReducers({
    ...sortReducers(reducers),
    ...asyncReducers,
  });
}
