import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './Alert.css';

const Alert = ({ message, type }) => (
  <div
    className={classnames(style.alert, {
      [style[type]]: type,
    })}
  >
    {message}
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Alert;
