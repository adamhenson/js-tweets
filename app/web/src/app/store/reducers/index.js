import { combineReducers } from 'redux';

import message from './message';
import tweets from './tweets';

export default combineReducers({
  ...message,
  ...tweets,
  // other reducers...
});
