import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaUser, FaStore, FaBoxes, FaUserFriends } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import Profile from '../../../components/Profile';

import {
  Wrapper,
  Header,
  HeaderOptions,
  Container,
  Drawer,
  Content,
} from './styles';

import logo from '../../../assets/logo.png';

function DashboardLayout({ children }) {
  const { profile } = useSelector((state) => state.user);
  console.tron.log(profile);
  return (
    <Wrapper>
      <Header>
        <img src={logo} alt="e-ncarte logo" />
        <HeaderOptions>
          <li>
            <Link to="/dashboard">
              <AiFillHome />
            </Link>
          </li>
          <li>
            <Profile />
          </li>
        </HeaderOptions>
      </Header>
      <Container>
        <Drawer>
          <ul>
            <li>
              <Link to="/lojas">
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
