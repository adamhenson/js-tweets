import Hapi from 'hapi';
import * as configs from './config';
import logger from './logger';
import { Tweets } from './routes';

const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const port = config.API_PORT || '8080';
const loggerNamespace = 'index';

const server = Hapi.server({ port });

// routes
const tweets = new Tweets({ config });

// example: /api/tweets/getRecentTweets/_ericelliott,LeaVerou
server.route({
  method: 'GET',
  path: '/api/tweets/getRecentTweets/{screenNames}',
  handler: tweets.getRecentTweets,
});

(async function start() {
  try {
    await server.start();
  } catch (error) {
    logger.info({ loggerNamespace, error });

    // @TODO gracefully handle errors (restart?)
    process.exit(1);
  }

  logger.info(`app is running on ${port}`);
}());
