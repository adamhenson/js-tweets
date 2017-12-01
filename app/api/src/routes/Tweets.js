import Twitter from 'twitter';
import { respond } from '../helpers/route';

const USER_TIMELINE_KEY = 'statuses/user_timeline';
const USER_TIMELINE_COUNT = 10;

export default class Tweets {
  constructor({ config }) {
    this.client = new Twitter(config.twitter);
  }

  getRecentTweets = async (req, res) => {
    const { screenNames } = req.params;
    const screenNamesArray = screenNames.split(',');
    const promises = screenNamesArray.map(screenName => this.getUserTimeline(screenName));
    try {
      const data = await Promise.all(promises);
      const [foo] = data;

      return respond({
        res,
        status: 200,
        data,
      });
    } catch (error) {
      return respond({
        res,
        status: 500,
        error,
      });
    }
  }

  getUserTimeline = screen_name => this.client.get(USER_TIMELINE_KEY, {
    screen_name,
    count: USER_TIMELINE_COUNT,
  })
}
