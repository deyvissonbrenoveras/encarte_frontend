import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Insira um e-mail'),
  password: Yup.string()
    .min(8, 'A senha deve conter 8 caracteres ou mais')
    .required('Insira uma senha'),
});

function Login() {
  const dispatch = useDispatch();

  function submitHandle({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="e-ncarte logo" />
      <Form schema={schema} onSubmit={submitHandle}>
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Senha" />
        <button type="submit">Login</button>
      </Form>
      <Link to="/signup">Criar conta</Link>
    </>
  );
}

export default Login;
