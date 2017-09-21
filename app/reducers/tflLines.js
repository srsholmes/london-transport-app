// @flow

type Action =
  | { type: 'SET_TFL_LINES', lines: Array<string> }

export default function tflLines(state: Array<string> = [], action: Action) {
  switch (action.type) {
    case 'SET_TFL_LINES':
      return action.lines;
    default:
      return state;
  }
}
