import {
  TWEET_IS_FETCHING,
  TWEET_REQUEST_USER_DATA,
  TWEET_RECEIVE_USER_DATA,
} from '../../actions/tweets';

const defaultState = {
  isFetching: false,
  recentTweets: null,
};

const tweets = (
  state = { ...defaultState },
  action,
) => {
  switch (action.type) {
    case TWEET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case TWEET_REQUEST_USER_DATA:
      return {
        ...state,
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
