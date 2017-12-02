import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import RTProgressBar from 'react-toolbox/lib/progress_bar';
import style from './ProgressBar.css';

const ProgressBar = ({
  isActive,
}) => (
  <RTProgressBar
    className={classnames(style.progressBar, { [style.active]: isActive })}
    type="linear"
    mode="indeterminate"
  />
);

ProgressBar.propTypes = {
  isActive: PropTypes.bool,
};

ProgressBar.defaultProps = {
  isActive: false,
};

export default ProgressBar;
