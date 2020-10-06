import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../../components/Input';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';
import LoadingIcon from '../../components/LoadingIcon';

function Login() {
  const formRef = useRef();
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  async function submitHandle(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Insira um e-mail'),
        password: Yup.string()
          .min(8, 'A senha deve conter 8 caracteres ou mais')
          .required('Insira uma senha'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;
      dispatch(signInRequest(email, password));
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
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Senha" />
        <button type="submit">Login</button>
      </Form>
      <Link to="/signup">Criar conta</Link>
      {loading ? <LoadingIcon /> : null}
    </>
  );
}

export default Login;
