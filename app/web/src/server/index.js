/* eslint-disable global-require, no-console */
import path from 'path';

import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// eslint-disable-next-line no-unused-vars
import csshook from 'css-modules-require-hook/preset'; // import hook before routes

import renderMiddleware from './middleware/render';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());

if (isProduction) {
  app.use(compression());
} else {
  const {
    webpackDevMiddleware,
    webpackHotMiddleware,
  } = require('./middleware/webpack');

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
}

app.use(morgan(isProduction ? 'combined' : 'dev'));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(renderMiddleware);

app.listen(port, console.log(`Server running on port ${port}`));
