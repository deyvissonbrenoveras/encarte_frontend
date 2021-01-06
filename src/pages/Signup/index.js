import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../../components/Input';

import logo from '../../assets/logo.webp';
import LoadingIcon from '../../components/LoadingIcon';

import { signUpRequest } from '../../store/modules/auth/actions';

function Signup() {
  const loading = useSelector((state) => state.auth.loading);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  async function submitHandle(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Insira um nome'),
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Insira um e-mail válido'),
        password: Yup.string()
          .min(8, 'A senha deve conter 8 caracteres ou mais')
          .required('Insira uma senha'),
        confirmPassword: Yup.string()
          .required('Confirme sua senha')
          .oneOf([Yup.ref('password'), null], 'As senhas não conferem'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, password } = data;
      dispatch(signUpRequest(name, email, password));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }
  return (
    <>
      <img src={logo} alt="e-ncarte logo" />
      <Form ref={formRef} onSubmit={submitHandle}>
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
      {loading ? <LoadingIcon /> : null}
    </>
  );
}
export default Signup;
