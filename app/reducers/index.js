import { combineReducers } from 'redux';
import hello from './hello';
import tflLines from './tflLines';

export const sortReducers = red =>
  Object.keys(red).sort().reduce((acc, r) => ({ ...acc, [r]: red[ r ] }), {}); // Sort reducers alphabetically for dev
                                                                               // tools.
const reducers = {
  hello,
  tflLines,
};

export default function createReducer(asyncReducers) {
  return combineReducers({
    ...sortReducers(reducers),
    ...asyncReducers,
  });
}
