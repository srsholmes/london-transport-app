export default function tflLines(state = {}, action) {
  switch (action.type) {
    case 'SET_TFL_LINE_INFO':
      return { ...action.line };
    case 'SET_TFL_STATIONS':
      return { ...state, stations: action.stations };
    default:
      return state;
  }
}
