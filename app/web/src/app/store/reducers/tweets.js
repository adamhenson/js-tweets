import {
  TWEET_REQUEST_USER_DATA,
  TWEET_RECEIVE_USER_DATA,
} from '../../actions/tweets';

const defaultState = {
  hasAttemptedFetch: false,
  recentTweets: null,
};

const tweets = (
  state = { ...defaultState },
  action,
) => {
  switch (action.type) {
    case TWEET_REQUEST_USER_DATA:
      return {
        ...state,
        hasAttemptedFetch: true,
      };
    case TWEET_RECEIVE_USER_DATA:
      return {
        ...state,
        recentTweets: {
          ...state.recentTweets,
          ...action.payload,
        },
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

export default {
  tweets,
};
