import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUsersRequest } from '../../../store/modules/user/actions';

import { Table, Td, Th, Tr } from '../../../components/Table';

import { Container } from './styles';

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(loadUsersRequest());
  }, []);
  return (
    <Container>
      <h2>Usuários</h2>
      <Table>
        <Tr>
          <Th>Id</Th>
          <Th>Nome</Th>
          <Th>E-mail</Th>
          <Th>Ativo</Th>
        </Tr>
        {users &&
          users.map((user) => (
            <Tr>
              <Td>{user.id}</Td>
              <Td>
                <Link to={`/updateuser/${user.id}`}>{user.name}</Link>
              </Td>
              <Td>{user.email}</Td>
              <Td>Não</Td>
            </Tr>
          ))}
      </Table>
    </Container>
  );
}

export default Users;
