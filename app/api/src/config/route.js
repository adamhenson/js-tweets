import { Tweets } from '../routes';
import logger from '../logger';

const loggerNamespace = 'config/route';

export default (app) => {
  const tweets = new Tweets();

  app.get('/api/tweets/getUserTimeline/:screen_name', tweets.getUserTimeline);

  // error handling
  app.use((error, req, res, next) => {
    // treat as 404
    if (error.message && error.message.indexOf('not found')) {
      return next();
    }

    logger.info({ loggerNamespace, error: error.stack });

    // error page
    return res.status(500).json({ error: error.stack });
  });

  // assume 404 since no middleware responded
  app.use((req, res) => {
    const payload = {
      url: req.originalUrl,
      error: 'Not found',
    };
    if (req.accepts('json')) {
      return res.status(404).json(payload);
    }
    return res.status(404).render('404', payload);
  });

  return app;
};
