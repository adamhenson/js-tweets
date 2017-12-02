# Running Without Docker

To run without Docker, you will need Node.js `^8.8.1` and [`nodemon`](https://www.npmjs.com/package/nodemon).

### Steps

- `$ git clone git@github.com:adamhenson/js-tweets.git`

#### Start the API Server
- `$ cd js-tweets/app/api && npm install`
- `$ npm run dev`

#### Start the Web Server
- `$ cd js-tweets/app/web && npm install`
- `$ npm run dev`

Navigate to `http://localhost:3000`.
