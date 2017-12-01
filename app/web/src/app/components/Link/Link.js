import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import classnames from 'classnames';
import style from './Link.css';

const Link = ({
  children,
  className,
  isNavLink,
  onClick,
  to,
}) => ((!isNavLink)
  ? (
    <RouterLink
      className={classnames(className, style.link)}
      onClick={onClick}
      to={to}
    >
      {children}
    </RouterLink>
    )
  : (
    <RouterNavLink
      activeClassName={style.activeLink}
      className={classnames(className, style.link)}
      exact
      onClick={onClick}
      to={to}
    >
      {children}
    </RouterNavLink>
  ));

Link.propTypes = {
  isNavLink: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string.isRequired,
};

Link.defaultProps = {
  isNavLink: false,
  children: '',
  className: null,
  onClick: null,
};

export default Link;
