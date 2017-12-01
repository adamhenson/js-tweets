import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import Navigation from '../Navigation';
import ProgressBar from '../ProgressBar';

const shouldShowLoader = tweets => (tweets.isFetching);

const Top = ({
  tweets,
  message,
}) => (
  <div>
    <Navigation/>
    { message.isActive && message.body &&
      <Alert
        message={message.body}
        type={message.type}
      />
    }
    <ProgressBar isActive={shouldShowLoader(tweets)} />
  </div>
);

Top.propTypes = {
  tweets: PropTypes.shape({
    recentTweets: PropTypes.object,
  }),
  message: PropTypes.shape({
    body: PropTypes.string,
    isActive: PropTypes.bool,
    type: PropTypes.string,
  }),
};

Top.defaultProps = {
  tweets: {
    user: null,
  },
  message: {
    body: '',
    isActive: false,
    type: null,
  },
};

export default Top;
