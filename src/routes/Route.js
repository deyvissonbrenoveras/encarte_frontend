import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function RouteWrapper({ component: Component, isPrivate, ...rest }) {
  const signed = false;
  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default RouteWrapper;

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
