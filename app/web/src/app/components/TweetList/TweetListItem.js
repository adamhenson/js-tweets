import React from 'react';
import PropTypes from 'prop-types';
import { ListItem as RTListItem } from 'react-toolbox/lib/list';
import classnames from 'classnames';
import style from './TweetList.css';

const TweetListItem = ({
  avatar,
  caption,
  legend,
  url,
}) => (
  <RTListItem
    className={style.item}
    avatar={avatar}
    caption={caption}
    onClick={()=> window.open(url, '_blank')}
    legend={legend}
  />
);

TweetListItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default TweetListItem;
