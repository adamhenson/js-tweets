import fetch from 'isomorphic-fetch';
import { updateMessageAndClose } from './message';
import { getHTTPResponse } from '../utils';

export const TWEET_IS_FETCHING = 'TWEET_IS_FETCHING';
export const TWEET_REQUEST_USER_DATA = 'TWEET_REQUEST_USER_DATA';
export const TWEET_RECEIVE_USER_DATA = 'TWEET_RECEIVE_USER_DATA';

const API_PATH = 'http://localhost:8080/api/tweets';
const API_PATH_GET_RECENT_TWEETS = `${API_PATH}/getRecentTweets`;

// Synchronous Action Creators
// http://redux.js.org/docs/advanced/AsyncActions.html#synchronous-action-creators
export const isFetching = payload => ({
  type: TWEET_IS_FETCHING,
  payload,
});

const requestTweetData = () => ({
  type: TWEET_REQUEST_USER_DATA,
});

const receiveUserData = payload => ({
  type: TWEET_RECEIVE_USER_DATA,
  payload,
  receivedAt: Date.now(),
});

// Async Action Creators
// http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators
const tweetFetch = async (screenNames) => {
  const tweets = await fetch(`${API_PATH_GET_RECENT_TWEETS}/${screenNames}`);
  return tweets.json();
};

export const getTweets = () => (async (dispatch, getState) => {
  try {
    dispatch(requestTweetData());
    const tweets = await tweetFetch('_ericelliott,LeaVerou');
    return dispatch(receiveUserData(tweets));
  } catch (error) {
    return dispatch(updateMessageAndClose({
      body: error.message,
      type: 'error',
    }));
  }
});
