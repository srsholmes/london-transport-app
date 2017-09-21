import Config from 'react-native-config';

const { TFL_APP_ID, TFL_API_KEY } = Config;

export const favouriteLine = line => ({ type: 'FAVOURITE_LINE', line });

export const getStations = line => {
  return async dispatch => {
    const data = await fetch(`https://api.tfl.gov.uk/Line/${line}/StopPoints?app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_STATIONS', stations: data });
  };
};

export const setInitialFavourites = lines => ({ type: 'SET_INITIAL_FAVOURITE_LINES', lines });

export const fetchLines = () => {
  return async dispatch => {
    const data = await fetch(`https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,tflrail/Status?app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_LINES', lines: data });
  };
};

export const getLineInfo = id => {
  return async dispatch => {
    const data = await fetch(`https://api.tfl.gov.uk/Line/${id}/Status?detail=true&app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_LINE_INFO', line: data[0] });
  };
};
