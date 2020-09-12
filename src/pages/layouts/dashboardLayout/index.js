import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

function DashboardLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
