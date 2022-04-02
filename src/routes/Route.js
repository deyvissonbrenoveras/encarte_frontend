import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import PrivilegeEnum from '../util/PrivilegeEnum';

function RouteWrapper({
  component: Component,
  layout: Layout,
  privilegeRequired,
  showSearchBar,
  ...rest
}) {
  const signed = useSelector((state) => state.auth.signed);
  const profile = useSelector((state) => state.profile.profile);

  if (!signed && privilegeRequired < PrivilegeEnum.USER) {
    return <Redirect to="/login" />;
  }

  if (signed && privilegeRequired < profile.privilege) {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props} showSearchBar={showSearchBar}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default RouteWrapper;

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  privilegeRequired: PropTypes.number,
};

RouteWrapper.defaultProps = {
  privilegeRequired: 3,
};
