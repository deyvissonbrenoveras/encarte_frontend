import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsersRequest } from '../../../store/modules/user/actions';
import CustomTable from '../../../components/CustomTable';

import LoadingIcon from '../../../components/LoadingIcon';

function Users() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUsersRequest());
  }, [dispatch]);

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
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <CustomTable
          label="Usuários"
          headCells={[
            {
              id: 'id',
              numeric: true,
              disablePadding: false,
              label: 'Id',
            },
            {
              id: 'name',
              numeric: false,
              disablePadding: false,
              label: 'Nome',
              type: 'link',
            },
            {
              id: 'email',
              numeric: false,
              disablePadding: false,
              label: 'E-mail',
            },
            {
              id: 'active',
              numeric: false,
              disablePadding: false,
              label: 'Ativo',
              type: 'bool',
            },
            {
              id: 'privilege',
              numeric: false,
              disablePadding: false,
              label: 'Privilegio',
            },
          ]}
          rows={users.map((user) => ({
            id: user.id,
            name: { href: `/updateuser/${user.id}`, label: user.name },
            email: user.email,
            active: user.active,
            privilege: renderPrivilegeSwitch(user.privilege),
          }))}
        />
      )}
    </>
  );
}

export default Users;
