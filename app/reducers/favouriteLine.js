export default function favouriteLines(state = [], action) {
  switch (action.type) {
    case 'FAVOURITE_LINE':
      if (state.includes(action.line)) {
        return state.filter(x => !action.line);
      }
      return state.length ? [ ...state, action.line ] : [ action.line ];
    default:
      return state;
  }
}
