import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.png';

import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Insira um nome'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Insira um e-mail'),
  password: Yup.string()
    .min(8, 'A senha deve conter 8 caracteres ou mais')
    .required('Insira uma senha'),
  confirmPassword: Yup.string()
    .required('Confirme sua senha')
    .oneOf([Yup.ref('password'), null], 'As senhas não conferem'),
});
function Signup() {
  const dispatch = useDispatch();

  function submitHandle({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="e-ncarte logo" />
      <Form schema={schema} onSubmit={submitHandle}>
        <Input name="name" placeholder="Nome" />
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha"
        />
        <button type="submit">Criar conta</button>
      </Form>

      <Link to="/login">Fazer login</Link>
    </>
  );
}
export default Signup;
