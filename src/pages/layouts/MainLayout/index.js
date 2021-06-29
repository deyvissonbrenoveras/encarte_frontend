import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function MainLayout({ children }) {
  return <Container>{children}</Container>;
}
export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
