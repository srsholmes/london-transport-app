import {
  favouriteLine,
  getStations,
  setInitialFavourites,
  fetchLines,
  getLineInfo,
} from './';


test('favouriteLine', () => {
  expect(favouriteLine('test')).toEqual({ type: 'FAVOURITE_LINE', line: 'test' });
});

test('favouriteLine', () => {
  expect(setInitialFavourites('test')).toEqual({ type: 'SET_INITIAL_FAVOURITE_LINES', lines: 'test' });
});

test('getStations', async () => {
  const mockFn = jest.fn();
  await getStations('test')(mockFn);
  const calls = mockFn.mock.calls[ 0 ][ 0 ];
  expect(calls).toEqual({ stations: { data: { test: 'data' }, ok: true }, type: 'SET_TFL_STATIONS' });
});

test('fetchLines', async () => {
  const mockFn = jest.fn();
  await fetchLines('test')(mockFn);
  const calls = mockFn.mock.calls[ 0 ][ 0 ];
  expect(calls).toEqual({ lines: { data: { test: 'data' }, ok: true }, type: 'SET_TFL_LINES' });
});

test('getLineInfo', async () => {
  const mockFn = jest.fn();
  await getLineInfo('test')(mockFn);
  const calls = mockFn.mock.calls[ 0 ][ 0 ];
  expect(calls).toEqual({ type: 'SET_TFL_LINE_INFO', line: undefined });
});
