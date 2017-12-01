import React from 'react';
import PropTypes from 'prop-types';
import { IconMenu as RTIconMenu } from 'react-toolbox/lib/menu';
import classnames from 'classnames';
import style from './IconMenu.css';

const IconMenu = ({
  children,
}) => (
  <RTIconMenu
    icon="more_horiz"
    position="topLeft"
    menuRipple
  >
    { children }
  </RTIconMenu>
);

export default IconMenu;
