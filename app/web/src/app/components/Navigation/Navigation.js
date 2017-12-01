import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RTAppBar from 'react-toolbox/lib/app_bar';
import RTNavigation from 'react-toolbox/lib/navigation';
import Logo from '../Logo';
import Link from '../Link';
import style from './Navigation.css';

const Navigation = () => (
  <RTAppBar
    className={style.appBar}
    title="JS Tweets"
  >
    <Logo />
    <RTNavigation type="horizontal">
      <li className={style.item}>
        <Link
          isNavLink
          to="/"
        >
          Home
        </Link>
      </li>
    </RTNavigation>
  </RTAppBar>
);

export default Navigation;
