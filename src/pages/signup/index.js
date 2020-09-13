import React from 'react';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';
import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  name: Yup.string().required('Insira um nome'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Insira um e-mail'),
  password: Yup.string()
    .min(6, 'A senha deve conter 6 caracteres ou mais')
    .required('Insira uma senha'),
  confirmPassword: Yup.string()
    .required('Confirme sua senha')
    .oneOf([Yup.ref('password'), null], 'As senhas não conferem'),
});

function Signup() {
  return (
    <Container>
      <img src={logo} alt="e-ncarte logo" />
      <Form schema={schema}>
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
    </Container>
  );
}
export default Signup;
