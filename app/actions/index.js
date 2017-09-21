// @flow
import Config from 'react-native-config';

const { TFL_APP_ID, TFL_API_KEY } = Config;
import type { Action } from '../types/Action';
import type { Dispatch, GetState } from '../types/Store';

type ThunkAction = (dispatch: Dispatch) => any;

export const favouriteLine = (line: string): Action => ({ type: 'FAVOURITE_LINE', line });
export const setInitialFavourites = (lines: Array<string>): Action => ({ type: 'SET_INITIAL_FAVOURITE_LINES', lines });

export const getStations = (line: string): ThunkAction => {
  return async (dispatch: Dispatch) => {
    const data = await fetch(`https://api.tfl.gov.uk/Line/${line}/StopPoints?app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_STATIONS', stations: data });
  };
};

export const fetchLines = (): ThunkAction => {
  return async (dispatch: Dispatch) => {
    const data = await fetch(`https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,tflrail/Status?app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_LINES', lines: data });
  };
};

export const getLineInfo = (id: string): ThunkAction => {
  return async (dispatch: Dispatch) => {
    const data = await fetch(`https://api.tfl.gov.uk/Line/${id}/Status?detail=true&app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_LINE_INFO', line: data[ 0 ] });
  };
};
