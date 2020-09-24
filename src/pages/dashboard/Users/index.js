import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import { loadUsersRequest } from '../../../store/modules/user/actions';

import { Table, Td, Th, Tr } from '../../../components/Table';

import { Container } from './styles';
import LoadingIcon from '../../../components/LoadingIcon';

function Users() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUsersRequest());
  }, []);

  function renderPrivilegeSwitch(privilege) {
    switch (privilege) {
      case 0:
        return 'Root';
      case 1:
        return 'Administrador do sistema';
      case 2:
        return 'Administrador de loja';
      case 3:
        return 'Usuário';
      default:
        return '';
    }
  }
  return (
    <Container>
      <h2>Usuários</h2>
      {loading ? (
        <LoadingIcon />
      ) : (
        <Table>
          <Tr>
            <Th>Id</Th>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Ativo</Th>
            <Th>Privilégio</Th>
          </Tr>
          {users &&
            users.map((user) => (
              <Tr>
                <Td>{user.id}</Td>
                <Td>
                  <Link to={`/updateuser/${user.id}`}>{user.name}</Link>
                </Td>
                <Td>{user.email}</Td>
                <Td>
                  {user.active ? (
                    <FaCheckSquare color="#38db2c" />
                  ) : (
                    <FaSquare color="#dbdbdb" />
                  )}
                </Td>
                <Td>{renderPrivilegeSwitch(user.privilege)}</Td>
              </Tr>
            ))}
        </Table>
      )}
    </Container>
  );
}

export default Users;
