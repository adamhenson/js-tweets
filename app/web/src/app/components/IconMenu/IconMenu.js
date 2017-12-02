import React from 'react';
import { IconMenu as RTIconMenu } from 'react-toolbox/lib/menu';
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
