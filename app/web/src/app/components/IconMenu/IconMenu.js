import React from 'react';
import PropTypes from 'prop-types';
import { IconMenu as RTIconMenu } from 'react-toolbox/lib/menu';
import classnames from 'classnames';
import style from './IconMenu.css';

const IconMenu = ({
  children,
}) => (
  <RTIconMenu
    className={style.iconMenu}
    icon="more_horiz"
    position="topRight"
    menuRipple
  >
    { children }
  </RTIconMenu>
);

export default IconMenu;
