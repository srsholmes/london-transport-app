/* @flow */

export type Action =
  | { type: 'SET_INITIAL_FAVOURITE_LINES', lines: Array<string> }
  | { type: 'SET_TFL_STATIONS', stations: any }
  | { type: 'SET_TFL_LINES', lines: any }
  | { type: 'SET_TFL_LINE_INFO', line: any }
  | { type: 'FAVOURITE_LINE', line: string }
