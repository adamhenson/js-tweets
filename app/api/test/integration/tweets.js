import chai from 'chai';
import chaiHttp from 'chai-http';
import get from 'lodash.get';

const { expect } = chai;

const {
  API_DOMAIN = 'localhost',
  API_PORT = '8080',
  API_PROTOCOL = 'http',
} = process.env;
const app = `${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}`;

chai.use(chaiHttp);

describe('tweets', () => {
  describe('/api/tweets/getRecentTweets/{screenNames}', () => {
    it('should return correct data from GET request when screen name is a single user', async () => {
      const res = await chai.request(app).get('/api/tweets/getRecentTweets/LeaVerou');
      expect(res).to.be.json;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('array');

      const tweet = get(res.body.data, '[0].text');
      expect(tweet).to.be.a('string');
    });

    it('should return correct data from GET request when screen name is multiple users', async () => {
      const res = await chai.request(app).get('/api/tweets/getRecentTweets/LeaVerou,dan_abramov,jeresig');
      expect(res).to.be.json;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('array');

      const tweet = get(res.body.data, '[0].text');
      expect(tweet).to.be.a('string');
    });

    it('should return error from GET request when screen name is invalid', async () => {
      const res = await chai.request(app).get('/api/tweets/getRecentTweets/fjdjdjjddd?8*jd#');
      expect(res).to.be.json;
      
      // we could respond with a 404 or 500 if we wanted too, but technically nothing
      // went wrong in our app.
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.an('array');
    });
  });
});
