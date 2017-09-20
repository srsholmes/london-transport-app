export default function tflLines(state = [], action) {
  switch (action.type) {
    case 'SET_TFL_LINES':
      return action.lines;
    default:
      return state;
  }
}
