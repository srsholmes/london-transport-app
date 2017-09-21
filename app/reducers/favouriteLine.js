export default function favouriteLines(state = [], action) {
  switch (action.type) {
    case 'FAVOURITE_LINE':
      if (state.includes(action.line)) {
        return state.filter(x => x !== action.line);
      }
      return state.length ? [ ...state, action.line ] : [ action.line ];
    case 'SET_INITIAL_FAVOURITE_LINES':
      return state.concat(action.lines);
    default:
      return state;
  }
}
