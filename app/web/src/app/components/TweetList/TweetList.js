import React from 'react';
import PropTypes from 'prop-types';
import { List as RTList, ListSubHeader as RTListSubHeader } from 'react-toolbox/lib/list';
import classnames from 'classnames';
import style from './TweetList.css';

const TweetList = ({
  caption,
  children,
}) => (
  <RTList selectable ripple>
    <RTListSubHeader caption={caption} />
    { children }
  </RTList>
);

TweetList.propTypes = {
  caption: PropTypes.string,
};

TweetList.defaultProps = {
  caption: null,
};

export default TweetList;
