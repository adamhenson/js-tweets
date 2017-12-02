import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middleware = [...middleware, logger];
}

export default function configureStore(preloadedState) {
  return compose(autoRehydrate())(createStore)(
    reducer,
    preloadedState,
    applyMiddleware(...middleware),
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  );
}
