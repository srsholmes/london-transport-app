// @flow

type Action =
  | { type: 'SET_TFL_LINE_INFO', line: string }
  | { type: 'SET_TFL_STATIONS', stations: Array<string>, line: any }

export default function tflLines(state: any = {}, action: Action) {
  switch (action.type) {
    case 'SET_TFL_LINE_INFO':
      return { ...action.line };
    case 'SET_TFL_STATIONS':
      return { ...state, stations: action.stations };
    default:
      return state;
  }
}
