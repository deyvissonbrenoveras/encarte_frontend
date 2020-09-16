import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { Container } from './styles';

import { addStoreRequest } from '../../../store/modules/store/actions';

function NewStore() {
  const dispatch = useDispatch();
  function handleSubmit(data) {
    dispatch(addStoreRequest(data));
  }
  return (
    <Container>
      <h2>Nova loja</h2>
      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" />
        <Input name="url" placeholder="URL" />
        <Input name="address" placeholder="Endereço" />
        <Input name="city" placeholder="Cidade" />
        <Input name="phone" placeholder="Telefone" />
        <Input name="whatsapp" placeholder="Whatsapp" />
        <Input name="instagram" placeholder="Instagram" />
        <Input name="facebook" placeholder="Facebook" />
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}

export default NewStore;
