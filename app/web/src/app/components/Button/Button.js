import React from 'react';
import { Button as RTButton } from 'react-toolbox/lib/button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './Button.css';

const Button = ({
  float,
  icon,
  isIconLeft,
  label,
  onClick,
  size,
  to,
  ...rest
}) => (
  <RTButton
    {...rest}
    icon={icon}
    onClick={onClick}
    label={label}
    primary
    raised
    theme={{
      button: classnames(style.button, {
        [style[size]]: size,
        [style[float]]: (float !== 'none'),
      }),
      icon: classnames(style.icon, {
        [style.iconRight]: !isIconLeft,
      }),
    }}
  />
);

Button.propTypes = {
  ...RTButton.propTypes,
  float: PropTypes.oneOf(['none', 'left', 'right']),
  isIconLeft: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
  size: PropTypes.string,
};

Button.defaultProps = {
  ...RTButton.defaultProps,
  float: 'none',
  isIconLeft: false,
  onClick: null,
  to: null,
  size: null,
};

export default Button;
