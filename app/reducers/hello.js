export default function hello(state = 'London Map App', action) {
  switch (action.type) {
    case 'HELLO':
      return 'Goodbye';
    default:
      return state;
  }
}
