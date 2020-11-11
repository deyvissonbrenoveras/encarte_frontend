import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function RouteWrapper({
  component: Component,
  layout: Layout,
  isPrivate,
  ...rest
}) {
  const signed = useSelector((state) => state.auth.signed);

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  // if (signed && !isPrivate) {
  //   return <Redirect to="/dashboard" />;
  // }
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
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
  layout: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isPrivate: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
