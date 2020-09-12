import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import DashboardLayout from '../pages/layouts/dashboardLayout';
import DefaultLayout from '../pages/layouts/defaultLayout';

function RouteWrapper({ component: Component, isPrivate, ...rest }) {
  const signed = false;
  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }
  const Layout = signed ? DashboardLayout : DefaultLayout;
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
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
