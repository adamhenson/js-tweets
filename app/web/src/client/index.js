import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { persistStore } from 'redux-persist';
import CookieStorage from 'redux-persist-cookie-storage';
import App from '../app/containers/App';
import configureStore from '../app/store/configureStore';

const store = configureStore(window.__PRELOADED_STATE__);

// `blacklist` to omit client-side only persisted reducers.
// this prevents the following reducers from persisting server-side.
persistStore(store, {
  blacklist: [
    'message',
    'tweets',
  ],
  storage: new CookieStorage(),
});

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
