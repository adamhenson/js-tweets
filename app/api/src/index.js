import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as configs from './config';
import logger from './logger';

let app = express();
const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const port = config.API_PORT || '8080';
const { configureRoutes } = configs;

// middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app = configureRoutes(app, config);

app.listen(port);
logger.info(`app is running on ${port}`);
