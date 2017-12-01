import React, { Component } from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Helmet from '../../components/Helmet';
import { TweetList, TweetListItem } from '../../components/TweetList';
import { Top } from '../../components/App';
import { CONTENT_TWEET_INTRO, CONTENT_TWEET_TITLE } from '../../content';

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

    const recentTweets = get(tweets, 'recentTweets.data', []);

    return (
      <div>
        <Helmet
          title={CONTENT_TWEET_TITLE}
          url="http://www.foo.money"
        />
        <Top
          message={message}
          tweets={tweets}
        />
        <h1>{ CONTENT_TWEET_TITLE }</h1>
        <p>{ CONTENT_TWEET_INTRO }</p>
        <TweetList caption="Recent Tweets">
          { recentTweets.map((item, index) => (
            <TweetListItem
              key={item.text}
              avatar={item.user.profileImageUrl}
              caption={`${item.user.name} (@${item.user.screenName})`}
              legend={item.text}
              url={item.url}
            />
          )) }
        </TweetList>
        <Button
          onClick={() => getTweets('_ericelliott,LeaVerou')}
          size="block"
          label="Get Tweets!"
        />
      </div>
    );
  }
}
