import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RTAppBar from 'react-toolbox/lib/app_bar';
import Logo from '../Logo';
import style from './Navigation.css';
import { CONTENT_TWEET_TITLE } from '../../content';

const Navigation = () => (
  <RTAppBar
    className={style.appBar}
    title={CONTENT_TWEET_TITLE}
  >
    <Logo />
  </RTAppBar>
);

export default Navigation;
