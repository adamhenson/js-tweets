import React, { Component } from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import Helmet from '../../components/Helmet';
import { screenNames } from '../../twitterUsers.json';
import { TweetList, TweetListItem } from '../../components/TweetList';
import { IconMenu, IconMenuItem } from '../../components/IconMenu';
import { Top } from '../../components/App';
import {
  CONTENT_TWEET_INTRO,
  CONTENT_TWEET_RECENT_TWEETS,
  CONTENT_TWEET_TITLE,
} from '../../content';

// a string representation of all Twitter screen names to fetch.
const screenNamesString = screenNames.join();

export default class Tweets extends Component {
  async componentDidMount() {
    const {
      getTweets,
      tweets: {
        hasAttemptedFetch,
      },
    } = this.props;

    if (!hasAttemptedFetch) {
      getTweets(screenNamesString);
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
        <IconMenu>
          <IconMenuItem
            key="all"
            icon="refresh"
            onClick={() => (getTweets(screenNamesString))}
            value="View All"
            caption="View All"
          />
          { screenNames.map(screenName => (
            <IconMenuItem
              key={screenName}
              icon="refresh"
              onClick={() => (getTweets(screenName))}
              value={`@${screenName}`}
              caption={`@${screenName}`}
            />
          )) }
        </IconMenu>
        <TweetList caption={CONTENT_TWEET_RECENT_TWEETS}>
          { recentTweets.map(tweet => (
            <TweetListItem
              key={tweet.text}
              avatar={tweet.user.profileImageUrl}
              caption={`${tweet.user.name} (@${tweet.user.screenName})`}
              legend={tweet.text}
              url={tweet.url}
            />
          )) }
        </TweetList>
      </div>
    );
  }
}
