import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem as RTIconMenuItem } from 'react-toolbox/lib/menu';
import classnames from 'classnames';
import style from './IconMenu.css';

const IconMenuItem = ({
  caption,
  icon,
  onClick,
  value,
}) => (
  <RTIconMenuItem
    caption={caption}
    icon={icon}
    onClick={onClick}
    value={value}
  />
);

IconMenuItem.propTypes = {
  caption: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired,
};

export default IconMenuItem;
