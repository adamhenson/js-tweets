import get from 'lodash.get';

// combines / flattens an array of object arrays into a single array.
export function getCombinedArrays(arrays) {
  return arrays.reduce((accumulator, current) => ([
    ...accumulator,
    ...current,
  ]), []);
}

// returns a filtered out data that we will want to use.
export function getFilteredTweetData(data) {
  return data.map(tweet => ({
    createdAt: tweet.created_at,
    mediaUrl: get(tweet, 'entities.media[0].media_url'),
    text: tweet.text,
    user: {
      name: get(tweet, 'user.name'),
      screenName: get(tweet, 'user.screen_name'),
      profileImageUrl: get(tweet, 'user.profile_image_url'),
    },
  }));
}

// sorts an array of objects by `createdAt` date in descending order.
export function getSortedData(array) {
  return array.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));
}
