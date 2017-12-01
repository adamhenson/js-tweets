import React from 'react';
import { List as RTList } from 'react-toolbox/lib/list';
import style from './TweetList.css';

const TweetList = ({
  children,
}) => (
  <RTList selectable ripple className={style.list}>
    { children }
  </RTList>
);

export default TweetList;
