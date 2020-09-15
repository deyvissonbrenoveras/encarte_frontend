import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaUser, FaStore, FaBoxes, FaUserFriends } from 'react-icons/fa';
import { Wrapper, Header, Container, Drawer, Content } from './styles';

function DashboardLayout({ children }) {
  return (
    <Wrapper>
      <Header>Header</Header>
      <Container>
        <Drawer>
          <ul>
            <li>
              <Link to="/Lojas">
                <FaStore />
                Lojas
              </Link>
            </li>
            <li>
              <Link to="/produtos">
                <FaBoxes />
                Produtos
              </Link>
            </li>
            <li>
              <Link to="/parceiros">
                <FaUserFriends />
                Parceiros
              </Link>
            </li>
            <li>
              <Link to="/usuarios">
                <FaUser />
                Usuários
              </Link>
            </li>
          </ul>
        </Drawer>
        <Content>{children}</Content>
      </Container>
    </Wrapper>
  );
}

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
