import fetch from 'isomorphic-fetch';
import { updateMessageAndClose } from './message';

export const TWEET_REQUEST_USER_DATA = 'TWEET_REQUEST_USER_DATA';
export const TWEET_RECEIVE_USER_DATA = 'TWEET_RECEIVE_USER_DATA';

const API_PATH = 'http://localhost:8080/api/tweets';
const API_PATH_GET_RECENT_TWEETS = `${API_PATH}/getRecentTweets`;

// Synchronous Action Creators
// http://redux.js.org/docs/advanced/AsyncActions.html#synchronous-action-creators
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

export const getTweets = screenNames => (async (dispatch, getState) => {
  try {
    dispatch(requestTweetData());
    const tweets = await tweetFetch(screenNames);
    return dispatch(receiveUserData(tweets));
  } catch (error) {
    return dispatch(updateMessageAndClose({
      body: error.message,
      type: 'error',
    }));
  }
});
