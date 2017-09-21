// @flow

import type { Action } from '../types/Action';

export default function tflLines(state: {} = {}, action: Action) {
  switch (action.type) {
    case 'SET_TFL_LINE_INFO':
      return { ...action.line };
    case 'SET_TFL_STATIONS':
      return { ...state, stations: action.stations };
    default:
      return state;
  }
}
