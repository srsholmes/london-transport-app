import { combineReducers } from 'redux';
import tflLines from './tflLines';
import tflLineInfo from './tflLineInfo';
import router from './router';
import favouriteLines from './favouriteLine';

export const sortReducers = red =>
  Object.keys(red).sort().reduce((acc, r) => ({ ...acc, [r]: red[ r ] }), {}); // Sort reducers alphabetically for dev
                                                                               // tools.
const reducers = {
  tflLines,
  tflLineInfo,
  favouriteLines,
  nav: router,
};

export default function createReducer(asyncReducers) {
  return combineReducers({
    ...sortReducers(reducers),
    ...asyncReducers,
  });
}
