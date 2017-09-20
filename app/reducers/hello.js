export default function hello(state = 'initial Start', action) {
  switch (action.type) {
    case 'HELLO':
      return 'Goodbye';
    default:
      return state;
  }
}
