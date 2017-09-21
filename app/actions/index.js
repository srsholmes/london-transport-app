// @flow
import Config from 'react-native-config';

const { TFL_APP_ID, TFL_API_KEY } = Config;

type Action =
  | { type: 'SET_TFL_STATIONS', stations: any }
  | { type: 'SET_INITIAL_FAVOURITE_LINES', lines: Array<string> }
  | { type: 'SET_TFL_LINES', lines: any }
  | { type: 'SET_TFL_LINE_INFO', line: any }

type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch) => any;
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;

export const favouriteLine = (line: string) => ({ type: 'FAVOURITE_LINE', line });

export const getStations = (line: string): ThunkAction => {
  return async dispatch => {
    const data = await fetch(`https://api.tfl.gov.uk/Line/${line}/StopPoints?app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_STATIONS', stations: data });
  };
};

export const setInitialFavourites = (lines: Array<string>) => ({ type: 'SET_INITIAL_FAVOURITE_LINES', lines });

export const fetchLines = (): ThunkAction => {
  return async dispatch => {
    const data = await fetch(`https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,tflrail/Status?app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_LINES', lines: data });
  };
};

export const getLineInfo = (id: string): ThunkAction => {
  return async dispatch => {
    const data = await fetch(`https://api.tfl.gov.uk/Line/${id}/Status?detail=true&app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_LINE_INFO', line: data[ 0 ] });
  };
};
