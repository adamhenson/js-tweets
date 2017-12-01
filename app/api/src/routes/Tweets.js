import { respond } from '../helpers/route';

export default class Tweets {
  getUserTimeline = async (req, res) => {
    const { screen_name: screenName } = req.params;
    try {
      // @TODO fetch data here
      return respond({
        res,
        status: 200,
        data: `hello ${screenName}`,
      });
    } catch (error) {
      return respond({
        res,
        status: 500,
        error,
      });
    }
  }
}
