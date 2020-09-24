import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Choice, Check } from '@rocketseat/unform';

import {
  loadUsersRequest,
  updateRequest,
} from '../../../store/modules/user/actions';

import Privilege from '../../../util/PrivilegeEnum';
import { PrivilegeArea } from './styles';
import { SaveButton } from '../../../components/Buttons';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas não conferem'
  ),
});

function UpdateUser({ match }) {
  const dispatch = useDispatch();
  const id = Number(match.params.id);
  const users = useSelector((state) => state.user.users);
  const user = users.filter((usr) => usr.id === id)[0];

  useEffect(() => {
    dispatch(loadUsersRequest());
  }, []);

  function submitHandle(data) {
    dispatch(updateRequest(id, data));
  }
  return (
    <>
      <Form initialData={user} onSubmit={submitHandle} schema={schema}>
        <div>
          <Check name="active" label="Ativo" />
        </div>
        <label htmlFor="name">Nome:</label>
        <Input name="name" placeholder="Insira o nome do usuário" />
        <label htmlFor="email">E-mail:</label>
        <Input
          type="email"
          name="email"
          placeholder="Insira o e-mail do usuário"
        />
        <label htmlFor="password">Senha:</label>
        <Input
          type="password"
          name="password"
          placeholder="Insira uma nova senha"
        />
        <label htmlFor="confirmPassword">Confirmação de Senha:</label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme a senha"
        />

        <label>Privilegio:</label>
        <PrivilegeArea>
          <Choice
            name="privilege"
            options={[
              { value: Privilege.ROOT, label: 'Root' },
              {
                value: Privilege.STORE_ADMINISTRATOR,
                label: 'Administrador de loja',
              },
              {
                value: Privilege.SYSTEM_ADMINISTRATOR,
                label: 'Administrador do sistema',
              },
              {
                value: Privilege.USER,
                label: 'Usuário',
              },
            ]}
            defaultChecked={1}
          />
        </PrivilegeArea>
        <SaveButton type="submit">Salvar</SaveButton>
      </Form>
    </>
  );
}

export default UpdateUser;

UpdateUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
