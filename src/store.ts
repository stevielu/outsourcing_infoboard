import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const middleware = [thunk, promiseMiddleware];

if (
  process.env.NODE_ENV !== 'production' &&
  localStorage.getItem('enableReduxLogger')
) {
  middleware.push(logger);
}

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
