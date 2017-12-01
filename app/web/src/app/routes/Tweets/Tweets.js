import React from 'react';
import PropTypes from 'prop-types';
import Helmet from '../../components/Helmet';
import { Top } from '../../components/App';
import { CONTENT_TWEET_INTRO } from '../../content';

const Tweets = ({
  message,
  getTweets,
  tweets,
}) => (
  <div>
    <Helmet
      title="JS Tweets"
      url="http://www.foo.money"
    />
    <Top
      message={message}
      tweets={tweets}
    />
    <h1>{ CONTENT_TWEET_INTRO }</h1>
  </div>
);

Tweets.propTypes = {};

export default Tweets;