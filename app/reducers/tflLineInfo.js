export default function tflLines(state = {}, action) {
  switch (action.type) {
    case 'SET_TFL_LINE_INFO':
      return { ...action.line };
    default:
      return state;
  }
}
