/* global CSS_BUNDLE: true, VENDOR_BUNDLE: true, CLIENT_BUNDLE: true */
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { persistStore } from 'redux-persist';
import CookieStorage from 'redux-persist-cookie-storage';
import App from '../../app/containers/App';
import configureStore from '../../app/store/configureStore';
import { cookieReduxState } from '../../app/utils';

const isProduction = process.env.NODE_ENV === 'production';

export default function render(req, res) {
  const context = {};
  const cookies = req.cookies || {};
  const cookieStore = cookieReduxState(cookies);
  const store = configureStore(cookieStore);

  // `blacklist` to omit client-side only persisted reducers.
  persistStore(store, {
    blacklist: ['message'],
    storage: new CookieStorage({ cookies }),
  });

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  if (context.url) {
    return res.redirect(302, context.url);
  }

  //const head = Helmet.rewind();
  const helmet = Helmet.renderStatic();
  const preloadedState = JSON.stringify(store.getState());

  return res
    .status(context.status || 200)
    .send(`
      <!doctype html>
      <html lang="en" ${helmet.htmlAttributes.toString()}>
        <head>
          <meta charset="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <!-- https://github.com/google/material-design-icons -->
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <link href="${CSS_BUNDLE}" rel="stylesheet">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>window.__PRELOADED_STATE__ = ${preloadedState}</script>
          <script src="${VENDOR_BUNDLE}"></script>
          <script src="${CLIENT_BUNDLE}"></script>
        </body>
      </html>
    `);
}
