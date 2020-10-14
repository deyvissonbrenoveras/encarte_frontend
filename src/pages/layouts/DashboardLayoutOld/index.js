import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaUser, FaStore, FaUserFriends, FaBoxOpen } from 'react-icons/fa';
import { GiCheckboxTree } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';

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
  return (
    <Wrapper>
      <Header>
        <img src={logo} alt="logo" />
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
              <Link to="/newstore">
                <FaStore />
                Nova loja
              </Link>
            </li>
            <li>
              <Link to="/stores">
                <FaStore />
                Lojas
              </Link>
            </li>
            <li>
              <Link to="/newproduct">
                <FaBoxOpen />
                Novo produto
              </Link>
            </li>
            <li>
              <Link to="/newpartner">
                <FaUserFriends />
                Novo parceiro
              </Link>
            </li>
            <li>
              <Link to="/partners">
                <FaUserFriends />
                Parceiros
              </Link>
            </li>
            <li>
              <Link to="/newcategory">
                <GiCheckboxTree />
                Nova categoria
              </Link>
            </li>
            <li>
              <Link to="/categories">
                <GiCheckboxTree />
                Categorias
              </Link>
            </li>
            <li>
              <Link to="/users">
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
