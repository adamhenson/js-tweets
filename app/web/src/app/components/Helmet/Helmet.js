import React from 'react';
import PropTypes from 'prop-types';
import { Helmet as ReactHelmet } from 'react-helmet';

const APP_DESCRIPTION = 'The latest tweets from JS land.';
const APP_IMAGE = 'https://s3.amazonaws.com/foo.money/logo-1200x630.png';
const APP_NAME = 'JS Tweets';
const APP_URL = 'http://www.foo.money';

const Helmet = ({
  description,
  image,
  title,
  url,
}) => {
  return (
    <ReactHelmet>
      <title>{`${APP_NAME} | ${APP_DESCRIPTION}`}</title>
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={`${APP_NAME} | ${title}`} />
      <meta property="og:url" content={url} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:title" content={`${APP_NAME} | ${title}`} />
      <link rel="shortcut icon" href="https://s3.amazonaws.com/foo.money/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="https://s3.amazonaws.com/foo.money/logo-180.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="https://s3.amazonaws.com/foo.money/logo-32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="https://s3.amazonaws.com/foo.money/logo-16.png" />
    </ReactHelmet>
  );
};

Helmet.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

Helmet.defaultProps = {
  description: APP_DESCRIPTION,
  image: APP_IMAGE,
  meta: [],
  url: APP_URL,
};

export default Helmet;
