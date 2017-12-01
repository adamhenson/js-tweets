import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem as RTIconMenuItem } from 'react-toolbox/lib/menu';

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
};

export default IconMenuItem;
