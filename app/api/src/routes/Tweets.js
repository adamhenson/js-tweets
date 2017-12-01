import Twitter from 'twitter';
import { getCombinedArrays, getFilteredTweetData, getSortedData } from '../helpers/utilities';

const USER_TIMELINE_KEY = 'statuses/user_timeline';
const USER_TIMELINE_COUNT = 10;

export default class Tweets {
  constructor({ config }) {
    this.client = new Twitter(config.twitter);
  }

  // reads comma-separated `screenName` params and returns resulting data.
  getRecentTweets = async (req) => {
    try {
      const { screenNames } = req.params;
      const screenNamesArray = screenNames.split(',');

      // get Twitter timeline data for all users specified in params
      const promises = screenNamesArray.map(screenName => this.getUserTimeline(screenName));
      const data = await Promise.all(promises);

      // manipulate data
      const combinedData = getCombinedArrays(data);
      const filteredData = getFilteredTweetData(combinedData);
      const sortedData = getSortedData(filteredData);

      return {
        status: 200,
        data: sortedData,
      };
    } catch (error) {
      return {
        status: 500,
        error,
      };
    }
  }

  // returns a promise from the twitter client to get tweets by `screen_name`.
  getUserTimeline = screen_name => this.client.get(USER_TIMELINE_KEY, {
    screen_name,
    count: USER_TIMELINE_COUNT,
  })
}
