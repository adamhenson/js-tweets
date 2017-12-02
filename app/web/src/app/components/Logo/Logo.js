import React from 'react';
import Link from '../Link';
import style from './Logo.css';
import logo from './logo.png';

const Logo = () => (
  <Link
    className={style.logo}
    isNavLink
    to="/"
  >
    <img src={logo} alt="JS Tweets Logo" />
  </Link>
);

export default Logo;
