import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Check, Select } from '@rocketseat/unform';

import {
  loadUsersRequest,
  updateRequest,
} from '../../../store/modules/user/actions';

import { ActiveInputArea } from './styles';

import Privilege from '../../../util/PrivilegeEnum';
import { SaveButton } from '../../../components/Buttons';

const selectOptions = [
  { id: Privilege.ROOT, title: 'Root' },
  { id: Privilege.SYSTEM_ADMINISTRATOR, title: 'Administrador do sistema' },
  { id: Privilege.STORE_ADMINISTRATOR, title: 'Administrador de loja' },
  { id: Privilege.USER, title: 'Usuário' },
];

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  privilege: Yup.number(),
  active: Yup.boolean(),
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
  const initialData = user
    ? { ...user, privilege: String(user.privilege) }
    : null;
  useEffect(() => {
    dispatch(loadUsersRequest());
  }, []);

  function submitHandle(data) {
    dispatch(updateRequest(id, data));
  }
  return (
    <>
      <Form initialData={initialData} onSubmit={submitHandle} schema={schema}>
        <ActiveInputArea>
          <Check name="active" label="Ativo" />
        </ActiveInputArea>
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
        <div>
          <Select name="privilege" options={selectOptions} />
        </div>
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
