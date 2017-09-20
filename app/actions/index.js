import Config from 'react-native-config';

const { TFL_APP_ID, TFL_API_KEY } = Config;

export const fetchLines = () => {
  return async (dispatch, getState) => {
    // TODO: Put the url into a constants
    const data = await fetch(`https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,tflrail/Status?app_id=${TFL_APP_ID}&app_key=${TFL_API_KEY}`).then(x => x.json());
    dispatch({ type: 'SET_TFL_LINES', lines: data });
  };
};
