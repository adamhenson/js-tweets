import Twitter from 'twitter';
import { getCombinedArrays, getFilteredTweetData, getSortedData } from '../helpers/utilities';
import { respond } from '../helpers/route';

const USER_TIMELINE_KEY = 'statuses/user_timeline';
const USER_TIMELINE_COUNT = 10;

export default class Tweets {
  constructor({ config }) {
    this.client = new Twitter(config.twitter);
  }

  // reads comma-separated `screenName` params and responds with data or an error.
  getRecentTweets = async (req, res) => {
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

      return respond({
        res,
        status: 200,
        data: sortedData,
      });
    } catch (error) {
      return respond({
        res,
        status: 500,
        error,
      });
    }
  }

  // returns a promise from the twitter client to get tweets by `screen_name`
  getUserTimeline = screen_name => this.client.get(USER_TIMELINE_KEY, {
    screen_name,
    count: USER_TIMELINE_COUNT,
  })
}
