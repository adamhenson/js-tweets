import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Helmet from '../../components/Helmet';
import { Top } from '../../components/App';
import { CONTENT_TWEET_INTRO } from '../../content';

export default class Tweets extends Component {
  async componentDidMount() {
    const {
      getTweets,
      tweets: {
        hasAttemptedFetch,
      },
    } = this.props;

    if (!hasAttemptedFetch) {
      getTweets('_ericelliott,LeaVerou');
    }
  }

  render() {
    const {
      message,
      getTweets,
      tweets,
    } = this.props;

    return (
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
        <Button
          onClick={() => getTweets('_ericelliott,LeaVerou')}
          size="block"
          label="Get Tweets!"
        />
      </div>
    );
  }
}
