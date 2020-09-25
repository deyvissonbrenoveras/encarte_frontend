import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { Container, ImageInputs } from './styles';

import ImageInput from '../../../components/ImageInput';
import { addStoreRequest } from '../../../store/modules/store/actions';
import { SaveButton } from '../../../components/Buttons';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Máximo de 50 caracteres')
    .required('O nome é obrigatório'),
  url: Yup.string()
    .max(50, 'Máximo de 50 caracteres')
    .required('A URL é obrigatória'),
  address: Yup.string().max(100, 'Máximo de 100 caracteres'),
  city: Yup.string().max(100, 'Máximo de 100 caracteres'),
  phone: Yup.string().max(100, 'Máximo de 100 caracteres'),
  whatsapp: Yup.string().max(100, 'Máximo de 100 caracteres'),
  instagram: Yup.string().max(100, 'Máximo de 100 caracteres'),
  facebook: Yup.string().max(100, 'Máximo de 100 caracteres'),
  logoId: Yup.number(),
  coverId: Yup.number(),
});

function NewStore() {
  const dispatch = useDispatch();
  function handleSubmit(data) {
    dispatch(addStoreRequest(data));
  }
  return (
    <Container>
      <h2>Nova loja</h2>
      <Form onSubmit={handleSubmit} schema={schema}>
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

        <SaveButton type="submit">Salvar</SaveButton>
      </Form>
    </Container>
  );
}

export default NewStore;
