// Use this for prod
const noTrackIfDev = (fn) => (...x) => __DEV__ ? null : fn(...x);

const track = (fn) => (...x) => fn(...x); // Can swap out the functions to test

const GoogleAnalytics = {
  trackEvent: track((action, state) => {
    console.log('Tracking GA Event');
    console.log(action);
  }),
};

const TRACKING = {
  FAVOURITE_LINE: [
    GoogleAnalytics.trackEvent,
  ],
};

export const trackingMiddleware = store => next => action => {
  const state = store.getState();
  if (Object.keys(TRACKING).includes(action.type)) {
    TRACKING[ action.type ].forEach(fn => fn(action, state));
  }
  return next(action);
};

const defaultErrorHandler = (ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler()) || ErrorUtils._globalHandler;

const initGlobalErrorHandler = store => {
  ErrorUtils.setGlobalHandler((err, isFatal) =>
    trackingMiddleware(store)(() => defaultErrorHandler(err, isFatal))({ type: 'ERROR', err, isFatal }));
};

export const init = store => {
  initGlobalErrorHandler(store);
};

const Tracking = {
  init,
  trackingMiddleware,
};

export default Tracking;
