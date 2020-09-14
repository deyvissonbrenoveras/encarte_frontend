import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function AuthLayout({ children }) {
  return <Container>{children}</Container>;
}
export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
