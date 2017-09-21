// @flow

import type { Action } from '../types/Action';

export default function tflLines(state: Array<string> = [], action: Action) {
  switch (action.type) {
    case 'SET_TFL_LINES':
      return action.lines;
    default:
      return state;
  }
}
