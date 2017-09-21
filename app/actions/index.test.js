import {
  favouriteLine,
  getStations,
  setInitialFavourites,
  fetchLines,
  getLineInfo,
} from './';

const dispatchMock = (args) => {
  console.log('dispatch Mock', args)
}

test('favouriteLine', () => {
  expect(favouriteLine('test')).toEqual({ type: 'FAVOURITE_LINE', line: 'test' });
});

test('favouriteLine', () => {
  expect(setInitialFavourites('test')).toEqual({ type: 'SET_INITIAL_FAVOURITE_LINES', lines: 'test' });
});


test('getStations', async () => {
  expect(getStations('test')(dispatchMock)).toEqual({ type: 'FAVOURITE_LINE', line: 'test' });
});

test('fetchLines', async () => {
  expect(fetchLines('test')(dispatchMock)).toEqual({ type: 'FAVOURITE_LINE', line: 'test' });
});

test.only('getLineInfo', async () => {
  const res = await getLineInfo('test')(dispatchMock);
  console.log('********')
  console.log(res)
  expect().toEqual({ type: 'FAVOURITE_LINE', line: 'test' });
});
