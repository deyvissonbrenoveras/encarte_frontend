import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { Container, ImageInputs } from './styles';

import ImageInput from '../../../components/ImageInput';
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
        <ImageInputs>
          <ImageInput inputName="logoId" inputId="logo" inputLabel="Logo:" />
          <ImageInput
            inputName="coverId"
            inputId="cover"
            inputLabel="imagem da campanha:"
          />
        </ImageInputs>

        <label htmlFor="name">Nome:</label>
        <Input name="name" placeholder="Insira o nome da loja" />

        <label htmlFor="url">URL:</label>
        <Input name="url" placeholder="Insira a URL" />

        <label htmlFor="address">Endereço:</label>
        <Input name="address" placeholder="Insira o endereço" />

        <label htmlFor="city">Cidade:</label>
        <Input name="city" placeholder="Insira a cidade" />

        <label htmlFor="phone">Telefone:</label>
        <Input name="phone" placeholder="Insira o telefone" />

        <label htmlFor="whatsapp">Whatsapp:</label>
        <Input name="whatsapp" placeholder="Insira o Whatsapp" />

        <label htmlFor="instagram">Instagram:</label>
        <Input name="instagram" placeholder="Insira o Instagram" />

        <label htmlFor="facebook">Facebook:</label>
        <Input name="facebook" placeholder="Insira o Facebook" />

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}

export default NewStore;
